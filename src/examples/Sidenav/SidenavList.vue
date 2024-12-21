<script setup>
import { useRoute } from "vue-router";
import { useUIStore } from "@/store/uiStore";
import SidenavItem from "./SidenavItem.vue";
import { ref, watch, onMounted } from "vue";

// Mengakses store UI
const uiStore = useUIStore();
const route = useRoute();

// Role pengguna disimpan di localStorage
const userRole = ref(localStorage.getItem("userRole") || "guest");
const isModalVisible = ref(false);

// Watcher untuk sinkronisasi role di localStorage
watch(
  () => localStorage.getItem("userRole"),
  (newRole) => {
    userRole.value = newRole; // Perbarui role jika localStorage berubah
  }
);

// Perbarui role saat komponen di-mount
onMounted(() => {
  userRole.value = localStorage.getItem("userRole");
});

// Watcher untuk mengubah status sidebar saat modal terbuka
watch(isModalVisible, (newVal) => {
  uiStore.showSidenav = !newVal; // Mengupdate status sidebar di Pinia store
});

// Fungsi untuk mendapatkan route saat ini
const getRoute = () => route.name;
</script>

<template>
  <aside
    :class="[ 'sidebar', { 'sidebar-hidden': !uiStore.showSidenav, 'sidebar-inactive': isModalVisible } ]"
  >
    <div
      class="collapse navbar-collapse w-auto h-auto h-100"
      id="sidenav-collapse-main"
    >
      <ul class="navbar-nav">
        <!-- Menu untuk WH Operator -->
        <template v-if="userRole === 'WH_OPERATOR'">
          <li class="nav-item">
          <sidenav-item
            to="/wh-operator"
            :class="getRoute() === 'dashboardWH' ? 'active' : ''"
            navText="Dashboard"
          >
            <template v-slot:icon
              ><i class="bi bi-house-door text-primary text-sm opacity-10"></i
            ></template>
          </sidenav-item>
        </li>
          <li class="nav-item">
            <sidenav-item
              to="/wh-operator/tables"
              :class="getRoute() === 'wh-operator/tables' ? 'active' : ''"
              navText="Master Data"
            >
              <template v-slot:icon
                ><i class="bi bi-calendar-day text-warning text-sm opacity-10"></i
              ></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/wh-operator/spk"
              :class="getRoute() === 'wh-operator/spk' ? 'active' : ''"
              navText="SPK Masuk"
            >
              <template v-slot:icon
                ><i class="bi bi-credit-card text-success text-sm opacity-10"></i
              ></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/wh-operator/riwayat-spk"
              :class="getRoute() === 'wh-operator/riwayat-spk' ? 'active' : ''"
              navText="Riwayat SPK"
            >
              <template v-slot:icon
                ><i class="bi bi-calendar-check text-warning text-sm opacity-10"></i
              ></template>
            </sidenav-item>
          </li>
          <!-- Profile Karyawan -->
          <li class="nav-item">
            <sidenav-item
              to="/wh-operator/profile"
              :class="getRoute() === 'wh-operator/profile' ? 'active' : ''"
              navText="Profile Karyawan"
            >
              <template v-slot:icon
                ><i class="bi bi-person-circle text-info text-sm opacity-10"></i
              ></template>
            </sidenav-item>
          </li>
        </template>

        <!-- Menu untuk PH Operator -->
        <template v-if="userRole === 'PH_OPERATOR'">
          <li class="nav-item">
          <sidenav-item
            to="/ph-operator"
            :class="getRoute() === 'dashboardPH' ? 'active' : ''"
            navText="Dashboard"
          >
            <template v-slot:icon
              ><i class="bi bi-house-door text-primary text-sm opacity-10"></i
            ></template>
          </sidenav-item>
        </li>
          <li class="nav-item">
            <sidenav-item
              to="/ph-operator/master-data"
              :class="getRoute() === 'ph-operator/master-data' ? 'active' : ''"
              navText="Master Data"
            >
              <template v-slot:icon
                ><i class="bi bi-calendar-day text-warning text-sm opacity-10"></i
              ></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/ph-operator/pengajuan-spk"
              :class="getRoute() === 'ph-operator/pengajuan-spk' ? 'active' : ''"
              navText="Pengajuan SPK"
            >
              <template v-slot:icon
                ><i class="bi bi-pencil-square text-warning text-sm opacity-10"></i
              ></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/ph-operator/riwayat-spk"
              :class="getRoute() === 'ph-operator/riwayat-spk' ? 'active' : ''"
              navText="Riwayat SPK"
            >
              <template v-slot:icon
                ><i class="bi bi-calendar-check text-warning text-sm opacity-10"></i
              ></template>
            </sidenav-item>
          </li>
        </template>

        <!-- Menu Akun (Tampil untuk semua role) -->
      
      </ul>
    </div>
  </aside>
</template>
