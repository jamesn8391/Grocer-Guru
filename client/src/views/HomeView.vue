<script setup>
</script>

<template>
  <div class="container mt-5">
    <div class="row bg-color">
      <div class="col">
        <img alt="Background" src="@/assets/background.jpg" style="width: 100%;">
      </div>
      <div class="col">
        <div class="container mt-5 pt-5 text-center">
          <h1>
            Welcome to Grocer Guru!<br>Get started by adding items.
          </h1>
          <button @click="toggleGroceryList" class="btn btn-secondary mt-3">
            <i class="fas fa-plus"></i> Add Grocery List
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showGroceryList" class="container mt-5 pt-5 text-center">
    <div v-for="(searchBar, index) in searchBars" :key="index" class="form-outline">
      <input
        ref="inputFields"
        v-model="groceryItems[index]"
        type="search"
        :id="'form' + index"
        class="form-control"
        :placeholder="'Enter Grocery Item ' + (index + 1)"
        aria-label="Search"
        @keydown.enter.prevent="addSearchBar(index)"
      />
    </div>

    <button @click="saveAllItems" class="btn btn-success mt-3 ml-3">
      All Items Added
    </button>
    <button @click="search" class="btn btn-success mt-3 ml-3"> Search</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
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
      const query = 'tomatoes'; // Replace with your desired query
      this.fetchShoppingResults(query);
    },
    fetchShoppingResults(query) {
      this.loading = true;
      axios.get('/shopping-results?q=' + query)
        .then(response => {
          this.shoppingResults = response.data;
          this.loading = false;
          console.log('Shopping Results:', this.shoppingResults); // Print results to console
        })
        .catch(error => {
          this.error = error.response ? error.response.data.error : 'An error occurred.';
          this.loading = false;
          console.error('Error:', this.error); // Print error to console
        });
    },
    saveAllItems() {
      console.log('All items:', this.groceryItems);
    }
  }
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
