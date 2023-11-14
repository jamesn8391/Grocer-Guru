<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <header class="bg-dark">
      <div class="container d-flex align-items-center justify-content-between">
        <img alt="Guru logo" class="logo ms-auto" src="@/assets/OIG-removebg-preview.png" width="125" height="125" />
        <nav class="d-flex">
          <RouterLink class="nav-link ml-auto" to="/">Home</RouterLink>
          <RouterLink class="nav-link" to="/about">About</RouterLink>
        </nav>
      </div>
    </header>
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
body {
  background-color: #ffffff;
  margin: 0;
}

.container {
  padding: 1rem;
}

.logo {
  display: block;
}

nav {
  font-size: 20px;
  color: #4cda98;
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
