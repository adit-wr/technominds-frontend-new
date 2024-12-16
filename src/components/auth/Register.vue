<script setup>
import { ref, onBeforeUnmount, onBeforeMount } from "vue";
import { useUIStore } from "@/store/uiStore";
import { register as registerService } from "@/services/authService";
import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const body = document.getElementsByTagName("body")[0];
const uiStore = useUIStore();

// State
const username = ref("");
const email = ref("");
const password = ref("");
const error = ref("");

// Lifecycle hooks
onBeforeMount(() => {
  uiStore.hideConfigButton = true;
  uiStore.showNavbar = false;
  uiStore.showSidenav = false;
  uiStore.showFooter = false;
  body.classList.remove("bg-gray-100");
});

onBeforeUnmount(() => {
  uiStore.hideConfigButton = false;
  uiStore.showNavbar = true;
  uiStore.showSidenav = true;
  uiStore.showFooter = true;
  body.classList.add("bg-gray-100");
});

// Methods
const register = async () => {
  error.value = ""; // Reset error message
  try {
    const response = await registerService(
      username.value,
      email.value,
      password.value
    );
    console.log("Registration successful:", response);
    alert("Registration successful!");
    // Reset form
    username.value = "";
    email.value = "";
    password.value = "";
  } catch (e) {
    error.value =
      e.response?.data.message || e.message || "An unexpected error occurred";
    console.error("Registration failed:", error.value);
  }
};
</script>

<template>
  <!-- Navbar -->
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <Navbar isBtn="bg-gradient-light" />
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <main class="main-content mt-0">
    <!-- Header Section -->
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg');
        background-position: top;"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Welcome!</h1>
            <p class="text-lead text-white">
              Solusi Terbaik untuk Kebutuhan Textile Anda: Kualitas Terjamin,
              Harga Bersaing, dan Layanan Terbaik untuk Kepuasan Pelanggan.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Register Form -->
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Register with</h5>
            </div>

            <!-- Social Media Buttons -->
            <div class="row px-xl-5 px-sm-4 px-3">
              <div class="col-3 ms-auto px-1">
                <a class="btn btn-outline-light w-100" href="#">
                  <!-- Social Icon 1 -->
                </a>
              </div>
              <div class="col-3 px-1">
                <a class="btn btn-outline-light w-100" href="#">
                  <!-- Social Icon 2 -->
                </a>
              </div>
              <div class="col-3 me-auto px-1">
                <a class="btn btn-outline-light w-100" href="#">
                  <!-- Social Icon 3 -->
                </a>
              </div>
              <div class="mt-2 position-relative text-center">
                <p
                  class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3"
                >
                  or
                </p>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="alert alert-danger text-center">
              {{ error }}
            </div>

            <!-- Form -->
            <div class="card-body">
              <form @submit.prevent="register">
                <ArgonInput
                  v-model="username"
                  id="username"
                  type="text"
                  placeholder="Username"
                  aria-label="Username"
                />
                <ArgonInput
                  v-model="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                />
                <ArgonInput
                  v-model="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                />

                <!-- Submit Button -->
                <div class="text-center">
                  <ArgonButton
                    type="submit"
                    color="primary"
                    class="w-100 mt-4 mb-3"
                  >
                    Register
                  </ArgonButton>
                </div>
                <p class="text-sm mt-3 mb-0">
                  Already have an account?
                  <a href="/Login" class="text-dark font-weight-bolder"
                    >Login</a
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Tambahan style jika dibutuhkan */
.alert {
  margin-bottom: 1rem;
}
</style>
