<script setup>
import Modal from '../components/Modal.vue';

</script>

<template>
  <div class="container mb-5">
    <div class="row bg-color">
      <div class="col">
        <img alt="Background" src="@/assets/background.jpg" style="width: 100%;">
      </div>
      <div class="col">
        <div class="container mt-5 pt-5 text-center">
          <h1 class="h1">
            Welcome to Grocer Guru!<br>Get started by adding items.
          </h1>
          <button @click="toggleGroceryList" class="btn btn-secondary mt-3">
            <i class="fas fa-plus"></i> Add Grocery List
          </button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div v-if="showGroceryList && !isLoading" class="col-5 mt-3 pt-5 text-center">
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

    <div>
      <Modal :shoppingResults="shoppingResults" />
    </div>

  </div>
</template>

<script>
import { fetchShoppingResults } from '../services/ShoppingService';
import { queryChatGPT } from '../services/ChatGPTService';
import { calibrationQueryHelper } from '../utils/CalibrationResponseHelper'

export default {
  data() {
    return {
      isLoading: false,
      showGroceryList: false,
      showModal: false,
      searchBars: [],
      groceryItems: [],
      shoppingResults: [],
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
          var answer = await this.CalibrateChatGPT();

          this.isLoading = false;
          this.showModal = false; // fix this when merging
        })
        .catch(error => {
          this.isLoading = false;
          console.error('Error:', error);
        });
    },

    async CalibrateChatGPT() {
      try {
        for (let i = 0; i < this.groceryItems.length; i++) {
          var item = this.groceryItems[i];
          var query = "You are a price-conscious buyer and are trying to hunt for the best grocery store deals given a set of data. Given the following JSON, determine the best 3 deals when a customer is requesting " + item + " on their grocery list. Format your response as the JSON with only the top 3 results included. Keep all the JSON data the same. \n";
          query += JSON.stringify(this.shoppingResults[i]);
          console.log(query);

          const result = await queryChatGPT(query);
          var JSONstring = result["message"];
          console.log(calibrationQueryHelper(JSONstring));

          // Use return value to handle the result as needed
          return calibrationQueryHelper(JSONstring);
        }
      } catch (error) {
        console.error(error);
        console.log(this.shoppingResults.map(innerList => innerList.slice(0, 3)));
        return { "error": "loser" };
      }
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
  margin-top: 180px;
}

.btn {
  margin-right: 10px;
}
</style>
