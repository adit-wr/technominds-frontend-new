<script setup>
import { storeToRefs } from "pinia";
import { useUIStore } from "@/store/uiStore";
import Sidenav from "./examples/Sidenav";
import Navbar from "@/examples/Navbars/Navbar.vue";

// Menggunakan Pinia Store
const uiStore = useUIStore();

// Destrukturisasi state dari store menggunakan `storeToRefs`
const { showSidenav, layout, showNavbar } = storeToRefs(uiStore);
</script>

<template>
  <div
    v-show="layout === 'landing'"
    class="landing-bg h-100 bg-gradient-primary position-fixed w-100"
  ></div>

  <sidenav v-if="showSidenav" :role="selectedRole" />

  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <!-- nav -->
    <navbar
      :class="[navClasses]"
      v-if="showNavbar"
      :selected-role="selectedRole"
    />
    <router-view />
  </main>
</template>
