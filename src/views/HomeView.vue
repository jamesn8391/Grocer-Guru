<script setup>
</script>

<template>
    <div class="container mt-5 pt-5 text-center">
    <p class="font-size-lg">Welcome to Grocer Guru!<br>Get started by adding items.</p>
    <div v-for="(searchBar, index) in searchBars" :key="index" class="form-outline">
      <input
        type="search"
        :id="'form' + index"
        class="form-control"
        :placeholder="'Enter Grocery Item ' + (index + 1)"
        aria-label="Search"
      />
    </div>

    <button @click="addSearchBar" class="btn btn-primary mt-3">
      <i class="fas fa-plus"></i> Add Grocery Item
    </button>
    
    <button @click="saveAllItems" class="btn btn-success mt-3 ml-3">
      All Items Added
    </button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      searchBars: [{ id: 0 }] 
    };
    return {
      groceryItems: [{ name: '' }]
    };
  },
  methods: {
    addSearchBar() {
      const newIndex = this.searchBars.length;
      this.searchBars.push({ id: newIndex });
      this.groceryItems.push({ name: '' });
    }
  },
  saveAllItems() {
      console.log('All items:', this.groceryItems);
  }
};
</script>

<style scoped>
.font-size-lg {
  font-size: 2rem; 
}

.btn {
  margin-right: 10px;
}

</style>