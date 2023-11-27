<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-light">
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div class="container-fluid">
                    <img alt="Guru logo" class="logo" src="@/assets/GrocerGuruLogo.png" width="150" height="150" />
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <router-link to="/" class="nav-link mx-4">Home</router-link>
                        <router-link to="/about" class="nav-link mx-3">About</router-link>
                    </div>
                </div>
            </nav>
        </nav>
    </header>
</template>

<style scoped>
nav {
  font-size: 20px;
  color: #4cda98;
  height: 100px;
}

.logo {
  display: inline-flex;
  pointer-events: none;
}

</style>