<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  
  <nav class="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
    <div class="container-fluid">
      <img alt="Guru logo" class="logo" src="@/assets/OIG-removebg-preview.png" width="150" height="150" /> 
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
      </div>
    </div>
  </nav>

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
nav {
  font-size: 20px;
  color: #4cda98;
  height: 100px;
}

.logo {
  display: inline-flex;
  pointer-events: none;
}
.custom-navbar {
    background-color: #f0f0f0; 
}
.container {
  padding: 1rem;
}
.btn {
  margin-right: 10px;
}

.custom-btn-color {
    background-color: #4cda98;
    color: #ffffff; 
}
.custom-btn-outline {
  border-color: #4cda98;
}

.custom-btn-outline:hover {
  background-color: #4cda98;
  border-color: #4cda98;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }
  nav {
    text-align: right;
  }
}
</style>
