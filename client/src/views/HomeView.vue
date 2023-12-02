<script setup>
import Modal from '../components/Modal.vue';
import { toRaw } from 'vue';

</script>

<template>
  <div class="container mb-5">
    <div class="row bg-color">
      <div class="col">
        <img alt="Background" src="@/assets/background.jpg" style="width: 100%;">
      </div>
      <div class="col">
        <div class="container mt-5 pt-5 text-center">
          <h1 v-if="showAddGroceries" class="h1">
            Welcome to Grocer Guru!<br>Get started by adding items.
          </h1>
          <h1 v-else class="h1">
            Welcome to Grocer Guru!
          </h1>
          <button v-if="showAddGroceries" @click="toggleGroceryList" class="btn btn-secondary mt-3">
            Add Grocery List
          </button>
          <button v-else @click="restartApplication" class="btn btn-success mt-3">
            Try Again!
          </button>
        </div>
      </div>
    </div>
    <hr v-if="(showGroceryList && !isLoading) || showFinalResults" class="hr py-1 mt-5" />
    <div class="row justify-content-center">
      <div v-if="showGroceryList && !isLoading" class="col-5 mt-3 text-center">
        <h2 class="h2"> Your Grocery List:</h2>
        <div v-for="(searchBar, index) in searchBars" :key="index" class="form-outline my-4">
          <input ref="inputFields" v-model="groceryItems[index]" type="search" :id="'form' + index" class="form-control"
            :placeholder="'Enter Grocery Item ' + (index + 1)" aria-label="Search"
            @keydown.enter.prevent="addSearchBar(index)" />
        </div>
        <button @click="search" class="btn btn-success mx-5"> Find Best Price</button>
      </div>
      <div v-if="isLoading" class="spinner-border mt-5" role="status">
      </div>
    </div>
    <div v-if="showFinalResults" class="row mt-3 justify-content-center align-items-center text-center">
      <h1 class="h1"> Your Recommended Items:</h1>
      <div v-for="result in finalResults" class="col">
        <div class="item-container align-items-center">
          <img :src="result.thumbnail" class="d-block mt-3 result-image w-75">
          <h5>{{ result.title }}</h5>
          <h5>{{ result.price }}</h5>
          <h5>{{ result.source }}</h5>
        </div>
      </div>
    </div>
    <hr v-if="showFinalResults" class="hr py-2 mt-3" />
    <div v-if="showFinalResults" class="row mt-3 justify-content-center align-items-center text-center">
      <h1 class="h1"> Your Recommended Store: {{ finalStore }}</h1>
      <div v-for="result in finalStoreItems" class="col">
        <div class="item-container align-items-center">
          <img :src="result.thumbnail" class="d-block mt-3 result-image w-75">
          <h5>{{ result.title }}</h5>
          <h5>{{ result.price }}</h5>
          <h5>{{ result.source }}</h5>
        </div>
      </div>
      <h1 class="h1"> Final Price: {{ this.finalPrice.toFixed(2) }}</h1>
    </div>
    <div v-if="showModal">
      <Modal :calibrationResults="calibrationResults" :selectedItems="selectedItems" :finalChatQuery="finalChatQuery" />
    </div>

  </div>
</template>

<script>
import { fetchShoppingResults, fetchFinalShoppingResults } from '../services/ShoppingService';
import { queryChatGPT } from '../services/ChatGPTService';
import { calibrationQueryHelper, finalQueryHelper, storeRecommenderHelper } from '../utils/ChatGPTHelper'

export default {
  data() {
    return {
      isLoading: false,
      showAddGroceries: true,
      showGroceryList: false,
      showModal: false,
      showFinalResults: false,
      searchBars: [],
      groceryItems: [],
      shoppingResults: [],
      calibrationResults: [],
      selectedItems: [],
      finalResults: [],
      finalStore: "",
      finalStoreItems: [],
      finalPrice: 0.00,

    };
  },
  methods: {
    toggleGroceryList() {
      this.showGroceryList = !this.showGroceryList;
      if (this.showGroceryList) {
        this.addSearchBar();
      }
    },
    addSearchBar(index) {
      const newIndex = this.searchBars.length;
      this.searchBars.push({ id: newIndex });
      this.groceryItems.push('');
      this.$nextTick(() => {
        const nextIndex = index + 1;
        if (nextIndex < this.$refs.inputFields.length) {
          this.$refs.inputFields[nextIndex].focus();
        }
      });
    },
    search() {
      this.shoppingResults = [];
      this.isLoading = true;

      Promise.all(
        this.groceryItems.map(item => fetchShoppingResults(item))
      )
        .then(async results => {
          this.shoppingResults = results;
          console.log(this.shoppingResults);

          // Wait for CalibrateChatGPT to complete before setting isLoading to false
          //this.calibrationResults = await this.CalibrateChatGPT();

          this.calibrationResults = this.shoppingResults.slice(0, 3);

          this.isLoading = false;
          this.showModal = true;
        })
        .catch(error => {
          this.isLoading = false;
          console.error('Error:', error);
        });
    },

    async finalChatQuery() {
      var shoppingResultsCopy = JSON.parse(JSON.stringify(this.shoppingResults));
      var remainingResults = shoppingResultsCopy.slice(3);
      remainingResults = this.removeThumbnails(remainingResults);
      console.log(this.shoppingResults)
      var query = "A user chose these three items: " + this.selectedItems.join('; ') + ". With the following prices: " + this.findItemPrice(this.selectedItems).join('; ') + ". And from these stores: " + this.findItemStore(this.selectedItems).join('; ') + ".";
      query += "\n\n Given this information, recommend the single best deal for each of the following JSONS. Return the information in a JSON format that only includes the best deal for each item from the data below."
      for (let resultIndex = 0; resultIndex < remainingResults.length; resultIndex++) {
        query += "\n\n" + this.groceryItems[resultIndex + 3] + ": " + JSON.stringify(remainingResults[resultIndex]);
      }
      console.log(query);
      console.log(query.length);
      this.showModal = false;
      this.isLoading = true;
      const result = await queryChatGPT(query);

      var finalNames = this.selectedItems.concat(finalQueryHelper(result["message"]));

      let shoppingNames = this.getShoppingInfoFromName(finalNames);
      this.finalResults = new Set(shoppingNames);
      console.log(this.finalResults)

      this.finalStore = await this.ChatGPTStoreRecommender();
      this.finalSearch();

    },

    findItemPrice(items) {
      var prices = []
      for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        for (let i = 0; i < this.shoppingResults.length; i++) {
          for (let objectIndex = 0; objectIndex < this.shoppingResults[i].length; objectIndex++) {
            if (this.shoppingResults[i][objectIndex].title === items[itemIndex]) {
              prices.push(this.shoppingResults[i][objectIndex].price);
            }
          }
        }
      }
      return prices;
    },

    findItemStore(items) {
      var stores = []
      for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        for (let i = 0; i < this.shoppingResults.length; i++) {
          for (let objectIndex = 0; objectIndex < this.shoppingResults[i].length; objectIndex++) {
            if (this.shoppingResults[i][objectIndex].title === items[itemIndex]) {
              stores.push(this.shoppingResults[i][objectIndex].source);
            }
          }
        }
      }
      return stores;
    },

    findItemByTitle(itemTitle) {
      // Iterate through each array in the data
      for (let i = 0; i < this.shoppingResults.length; i++) {
        const currentArray = this.shoppingResults[i];

        // Iterate through each object in the current array
        for (let j = 0; j < currentArray.length; j++) {
          const currentItem = currentArray[j];

          // Check if the title of the current item matches the provided itemTitle
          if (currentItem.title.toLowerCase().includes(itemTitle.toLowerCase())) {
            return currentItem;
          }
        }
      }

      return {};
    },

    removeThumbnails(items) {
      let itemsCopy = JSON.parse(JSON.stringify(items));
      for (let i = 0; i < itemsCopy.length; i++) {
        for (let objectIndex = 0; objectIndex < itemsCopy[i].length; objectIndex++) {
          delete itemsCopy[i][objectIndex].thumbnail
        }
      }
      return itemsCopy
    },

    getShoppingInfoFromName(names) {
      let shoppingResultsArray = [];
      for (let i = 0; i < names.length; i++) {
        for (let itemIndex = 0; itemIndex < this.shoppingResults.length; itemIndex++) {
          for (let insideIndex = 0; insideIndex < this.shoppingResults[itemIndex].length; insideIndex++) {
            console.log("name" + this.shoppingResults[itemIndex][insideIndex]);
            if (this.shoppingResults[itemIndex][insideIndex].title === names[i]) {
              shoppingResultsArray.push(this.shoppingResults[itemIndex][insideIndex])
            }
          }
        }
      }
      return shoppingResultsArray
    },

    async CalibrateChatGPT() {
      try {
        var calibrationResult = []
        var RemovedThumbnailShoppingResults = this.removeThumbnails(this.shoppingResults)
        for (let i = 0; i < 3; i++) {
          var item = this.groceryItems[i];
          var query = "You are a price-conscious buyer and are trying to hunt for the best grocery store deals given a set of data. Given the following JSON, determine the best 3 deals when a customer is requesting " + item + " on their grocery list. Format your response as the JSON with only the top 3 results included. Keep all the JSON data the same. \n";
          query += JSON.stringify(RemovedThumbnailShoppingResults[i]);
          console.log(query);

          const result = await queryChatGPT(query);
          var JSONstring = result["message"];
          console.log(calibrationQueryHelper(JSONstring, this.findItemByTitle));

          calibrationResult.push(calibrationQueryHelper(JSONstring, this.findItemByTitle));
        }
        return calibrationResult;

      } catch (error) {
        console.error(error);
        console.log(this.shoppingResults.map(innerList => innerList.slice(0, 3)));
        return { "error": "loser" };
      }
    },
    async ChatGPTStoreRecommender() {
      try {

        var query = "What store would you recommend based on the provided JSON below? Return your response as a JSON with 'store' as the key for your recommendation. \n\n";
        query += JSON.stringify(Array.from(this.finalResults));
        console.log(query);

        const result = await queryChatGPT(query);
        var JSONstring = result["message"];
        console.log(storeRecommenderHelper(JSONstring));

        return storeRecommenderHelper(JSONstring);

      } catch (error) {
        console.error(error);
        console.log(this.shoppingResults.map(innerList => innerList.slice(0, 3)));
        return { "error": "loser" };
      }
    },

    finalSearch() {

      var items = Array.from(this.finalResults).map(result => result.title);

      console.log(items)
      Promise.all(
        items.map((item, index) => (this.findItemStore(Array(item))[0].indexOf(this.finalStore) ? fetchFinalShoppingResults(this.groceryItems[index], this.finalStore) : this.findItemByTitle(item)))
      )
        .then(async results => {
          this.finalStoreItems = results;
          console.log(this.finalStoreItems);

          this.finalPrice = 0.00;

          this.finalStoreItems.forEach(product => {
            const price = parseFloat(product.price.replace("$", ""));
            this.finalPrice += price;
          });

          this.showFinalResults = true;
          this.showGroceryList = false;
          this.isLoading = false;
          this.showAddGroceries = false;

        })
        .catch(error => {
          this.isLoading = false;
          console.error('Error:', error);
        });
    },

    restartApplication() {
      location.reload();
    },

  },
};
</script>

<style scoped>
.font-size-lg {
  font-size: 2rem;
  font-family: sans-serif;
}

.bg-color {
  background-color: #cedcdd;
}

.container {
  margin-top: 150px;
}

.btn {
  margin-right: 10px;
}

.result-image {
  border: 2px solid black;
  border-radius: 12px;
  height: 25%;
  margin: auto;
}

.item-container {
  margin: auto;
  text-align: center;
  width: 25vw;
}

.restart-button {
  width: 8%;
}
</style>
