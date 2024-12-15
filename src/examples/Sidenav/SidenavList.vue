<script setup>
import { useRoute } from "vue-router";
import SidenavItem from "./SidenavItem.vue";
// eslint-disable-next-line
import SidenavCard from "./SidenavCard.vue";
// eslint-disable-next-line
import { ref, computed, watch} from "vue";

const route = useRoute();
const isSidebarVisible = ref(true);
const userRole = ref(localStorage.getItem("userRole") || "guest");
const isModalVisible = ref(false);

// Watcher untuk mengubah status sidebar saat modal terbuka
watch(isModalVisible, (newVal) => {
  isSidebarVisible.value = !newVal; 
});

const getRoute = () => route.name;
</script>

<template>
  <aside :class="['sidebar', { 'sidebar-hidden': !isSidebarVisible, 'sidebar-inactive': isModalVisible }]">
    <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <!-- Dashboard (Tampil untuk semua role) -->
        <li class="nav-item">
          <sidenav-item to="/dashboard-default" :class="getRoute() === 'dashboard-default' ? 'active' : ''" navText="Dashboard">
            <template v-slot:icon><i class="bi bi-house-door text-primary text-sm opacity-10"></i></template>
          </sidenav-item>
        </li>

        <!-- Menu untuk WH Operator -->
        <template v-if="userRole === 'wh_operator'">
          <li class="nav-item">
            <sidenav-item to="/wh-operator/tables" :class="getRoute() === 'wh-operator/tables' ? 'active' : ''" navText="Master Data">
              <template v-slot:icon><i class="bi bi-calendar-day text-warning text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item to="/wh-operator/spk-masuk" :class="getRoute() === 'wh-operator/spk-masuk' ? 'active' : ''" navText="SPK Masuk">
              <template v-slot:icon><i class="bi bi-credit-card text-success text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item to="/wh-operator/riwayat-spk" :class="getRoute() === 'wh-operator/riwayat-spk' ? 'active' : ''" navText="Riwayat SPK">
              <template v-slot:icon><i class="bi bi-calendar-check text-warning text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item to="/wh-operator/profile" :class="getRoute() === 'wh-operator/profile' ? 'active' : ''" navText="Profile">
              <template v-slot:icon><i class="bi bi-person-circle text-warning text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
        </template>

        <!-- Menu untuk PH Operator -->
        <template v-if="userRole === 'ph_operator'">
          <li class="nav-item">
            <sidenav-item to="/ph-operator/master-data" :class="getRoute() === 'ph-operator/master-data' ? 'active' : ''" navText="Master Data">
              <template v-slot:icon><i class="bi bi-calendar-day text-warning text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item to="/ph-operator/pengajuan-spk" :class="getRoute() === 'ph-operator/pengajuan-spk' ? 'active' : ''" navText="Pengajuan SPK">
              <template v-slot:icon><i class="bi bi-pencil-square text-warning text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item to="/ph-operator/riwayat-spk" :class="getRoute() === 'ph-operator/riwayat-spk' ? 'active' : ''" navText="Riwayat SPK">
              <template v-slot:icon><i class="bi bi-clock text-warning text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
        </template>
        
        <!-- Menu Akun (Tampil untuk semua role) -->
        <li class="mt-3 nav-item">
          <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6 ms-2">ACCOUNT PAGES</h6>
        </li>
        <li class="nav-item">
          <sidenav-item to="/signin" :class="getRoute() === 'signin' ? 'active' : ''" navText="Sign In">
            <template v-slot:icon><i class="bi bi-box-arrow-in-right text-danger text-sm opacity-10"></i></template>
          </sidenav-item>
        </li>
        <li class="nav-item">
          <sidenav-item to="/signup" :class="getRoute() === 'signup' ? 'active' : ''" navText="Sign up">
            <template v-slot:icon><i class="bi bi-person-plus text-danger text-sm opacity-10"></i></template>
          </sidenav-item>
        </li>
      </ul>
    </div>
  </aside>
</template>
