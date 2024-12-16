<script setup>
import { computed } from "vue";
import { useUIStore } from "@/store/uiStore";
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo.jpeg";
import logoWhite from "@/assets/img/logo.jpeg";

const uiStore = useUIStore();

const isRTL = computed(() => uiStore.isRTL);
const layout = computed(() => uiStore.layout);
const sidebarType = computed(() => uiStore.sidebarType);
const darkMode = computed(() => uiStore.darkMode);
</script>

<template>
  <div
    v-show="layout === 'default'"
    class="min-height-300 position-absolute w-100"
    :class="`${darkMode ? 'bg-transparent' : 'bg-success'}`"
  />

  <aside
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl"
    :class="`${isRTL ? 'me-3 rotate-caret fixed-end' : 'fixed-start ms-3'}    
      ${
        layout === 'landing' ? 'bg-transparent shadow-none' : ' '
      } ${sidebarType}`"
    id="sidenav-main"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>

      <router-link class="m-0 navbar-brand" to="/">
        <img
          :src="darkMode || sidebarType === 'bg-default' ? logoWhite : logo"
          class="navbar-brand-img h-100"
          alt="main_logo"
        />

        <span class="ms-2 font-weight-bold me-2">PT. TechnoMinds</span>
      </router-link>
    </div>

    <hr class="mt-0 horizontal dark" />

    <sidenav-list />
  </aside>
</template>
