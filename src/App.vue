<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Sidenav from "./examples/Sidenav";
import Navbar from "@/examples/Navbars/Navbar.vue";

const store = useStore();
const showSidenav = computed(() => store.state.showSidenav);
const layout = computed(() => store.state.layout);
const showNavbar = computed(() => store.state.showNavbar);
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
