<template>
    <div>
      <MainNavbar />
      <RouterView :key="$route.fullPath" />
      <FooterComponent />
    </div>
  </template>
  
  <script setup>
  import { RouterView } from "vue-router";
  import MainNavbar from "./components/MainNavbar.vue";
  import FooterComponent from "./components/FooterComponent.vue";
  </script>
  
  <style scoped></style>