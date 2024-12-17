<!-- Navbar.vue -->
<script setup>
import { computed, ref, watch } from "vue";
import { useUIStore } from "@/store/uiStore";
import { useRoute, useRouter } from "vue-router";
import Breadcrumbs from "../Breadcrumbs.vue";

// Refs and state management
const showRoleDropdown = ref(false);
const selectedRole = ref(localStorage.getItem("userRole") || null);
const uiStore = useUIStore();
const router = useRouter();
const isRTL = computed(() => uiStore.isRTL);

// Handle route and breadcrumb
const route = useRoute();
const currentRouteName = computed(() => route.name);
const currentDirectory = computed(() => {
  let dir = route.path.split("/")[1];
  return dir.charAt(0).toUpperCase() + dir.slice(1);
});

// Handle role selection
const handleRoleSelection = (role) => {
  selectedRole.value = role;
  showRoleDropdown.value = false;
  localStorage.setItem("userRole", role);

  // Logika untuk memeriksa akses role dan navigasi
  const authRole = localStorage.getItem("role");
  const isAuthenticated = localStorage.getItem("auth");

  if (isAuthenticated && authRole === role) {
    router.push({ name: role, params: { component: "items" } });
  } else {
    alert("Kamu tidak mendapatkan akses menuju role ini...");
    router.push({ name: "Login" });
    showRoleDropdown.value = false;
  }
};

// Watch for changes in selectedRole and update localStorage
watch(selectedRole, (newRole) => {
  localStorage.setItem("userRole", newRole);
});
</script>

<template>
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" :class="isRTL ? 'top-0 position-sticky z-index-sticky' : ''" id="navbarBlur" data-scroll="true">
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :current-page="currentRouteName" :current-directory="currentDirectory" />
      <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4" :class="isRTL ? 'px-0' : 'me-sm-4'" id="navbar">
        <ul class="navbar-nav justify-content-end">
          <!-- Role Dropdown -->
          <li class="nav-item dropdown d-flex align-items-center" :class="isRTL ? 'ps-2' : 'pe-2'">
            <a href="#" class="p-0 nav-link text-white" :class="[showRoleDropdown ? 'show' : '']" @click="showRoleDropdown = !showRoleDropdown">
              <i class="cursor-pointer fa fa-user"></i>
            </a>
            <ul class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4" :class="showRoleDropdown ? 'show' : ''">
              <li><a class="dropdown-item" @click="handleRoleSelection('WH_OPERATOR')">WH Operator</a></li>
              <li><a class="dropdown-item" @click="handleRoleSelection('ph_operator')">PH Operator</a></li>
            </ul>
            <ul>
              <li><a href="/login">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* CSS untuk memastikan dropdown berada di pojok kanan navbar */
.navbar .navbar-collapse {
  justify-content: flex-end;
}

.nav-item.dropdown {
  position: relative;
  display: inline-block;
}

/* Mengatur dropdown menu agar tampil di pojok kanan */
.nav-item.dropdown .dropdown-menu {
  right: 0; /* Menu dropdown muncul di kanan */
  left: auto; /* Menonaktifkan pengaturan kiri */
  min-width: 150px; /* Atur lebar minimal sesuai kebutuhan */
}

/* Styling tambahan */
.nav-item.dropdown .dropdown-item {
  padding: 10px 15px; /* Mengatur padding untuk kenyamanan */
  color: #333; /* Warna teks dropdown */
}

.nav-item.dropdown .dropdown-item:hover {
  background-color: #f0f0f0; /* Warna latar saat hover */
}
</style>
