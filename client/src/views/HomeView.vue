<script setup>
</script>

<template>
  <div class="container my-5">
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
    <button @click="askMrGPT('how far is the sun from earth')" class="btn btn-success mx-5"> Test Mr.GPT</button>
  </div>
</template>

<script>
import { fetchShoppingResults } from '../services/ShoppingService';
import { queryChatGPT } from '../services/ChatGPTService';

export default {
  data() {
    return {
      isLoading: false,
      showGroceryList: false,
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
        .then(results => {
          this.shoppingResults = results;
          this.isLoading = false;
          console.log(this.shoppingResults);
        })
        .catch(error => {
          this.isLoading = false;
          console.error('Error:', error);
        });
    },
    async askMrGPT(query) {
      try {
        const result = await queryChatGPT(query);
        console.log(result);
      } catch (error) {
        console.error(error);
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

.btn {
  margin-right: 10px;
}
</style>
