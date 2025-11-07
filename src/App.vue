<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/singleton">Singleton Pattern</router-link> |
      <router-link to="/factory-method">Factory-Method Pattern</router-link> |
      <router-link to="/adapter">Adapter Pattern</router-link> |
      <router-link to="/decorator">Decorator Pattern</router-link> |
      <router-link to="/observer">Observer Pattern</router-link> |
      <router-link to="/visitor">Visitor Pattern</router-link> |
      <router-link to="/builder">Builder Pattern</router-link> |
      <router-link to="/proxy">Proxy Pattern</router-link> |
      <router-link to="/strategy">Strategy Pattern</router-link> |
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
#app {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
}

nav {
  padding: 20px;
  text-align: center;
}

nav a {
  margin: 0 10px;
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

nav a.router-link-active {
  color: #35495e;
}
</style>