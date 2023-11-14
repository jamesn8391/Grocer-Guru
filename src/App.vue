<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <img alt="Guru logo" class="logo" src="@/assets/OIG-removebg-preview.png" width="150" height="150" /> 
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.container {
  padding: 1rem;
}
.logo {
  display: inline-flex;
  pointer-events: none;
}
nav {
  font-size: 20px;
  color: #4cda98;
  height: 100px;
}
/* Remove the hover color for the logo by overriding Bootstrap styles */
.navbar-dark .navbar-nav .nav-link:hover {
  color: #4cda98; /* Set the color to the desired non-hover color */
}
.navbar-brand {
  color: #4cda98;
}
.nav-link {
  color: #4cda98;
  margin-left: 15px; /* Adjust the margin between links as needed */
}
.nav-link:last-child {
  margin-right: 0;
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
