<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-md bg-light fixed-top py-0">
            <div class="container-fluid">
                <img alt="Guru logo" class="p-2" src="@/assets/GrocerGuruLogo.png" width="90" />
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">Home</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </header>
</template>

<style scoped>
.nav-item {
  font-size: 20px;
  color: #4cda98;
  padding-right: 25px;
}

</style>