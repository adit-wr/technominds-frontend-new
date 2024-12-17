<script setup>
import { onBeforeUnmount, onBeforeMount, ref } from "vue";
import { useAuthStore } from "@/store/authStore";
import { login as loginService } from "@/services/authService";
import { useUIStore } from "@/store/uiStore";
import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const uiStore = useUIStore();

const body = document.getElementsByTagName("body")[0];
const authStore = useAuthStore();

// Variabel untuk form input
const username = ref("");
const password = ref("");
const error = ref("");

// Lifecycle Hooks
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

// Fungsi login
const login = async () => {
  try {
    const { token, role } = await loginService(username.value, password.value);

    authStore.setToken(token);
    authStore.setRole(role);

    alert("Login Success");
    if (role === "WH_OPERATOR") {
      window.location.href = "/wh-operator";
    } else if (role === "PH_OPERATOR") {
      window.location.href = "/ph-operator";
    }
  } catch (err) {
    error.value = "Login Gagal Periksa Email atau Password";
    alert("Login Gagal Periksa Email atau Password");
  }
};
</script>

<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          isBlur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
          v-bind:darkMode="true"
          isBtn="bg-gradient-success"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">
                    Enter your username and password to sign in
                  </p>
                </div>
                <div class="card-body">
                  <!-- Hapus @submit.prevent="login" pada form -->
                  <form>
                    <div class="mb-3">
                      <argon-input
                        id="username"
                        type="text"
                        placeholder="Username"
                        v-model="username"
                        size="lg"
                      />
                    </div>
                    <div class="mb-3">
                      <argon-input
                        id="password"
                        type="password"
                        placeholder="Password"
                        v-model="password"
                        size="lg"
                      />
                    </div>

                    <argon-switch id="rememberMe" name="remember-me"
                      >Remember me</argon-switch
                    >

                    <div class="text-center">
                      <!-- Gunakan @click="login" untuk memanggil alert -->
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        @click="login"
                      >
                        Sign in
                      </argon-button>
                    </div>

                    <div v-if="error" class="text-danger text-center mt-2">
                      {{ error }}
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="/Register"
                      class="text-success text-gradient font-weight-bold"
                      >Registrasi</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
                  background-size: cover;
                "
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  "TechnoMinds"
                </h4>
                <p class="text-white position-relative">
                  Menghadirkan Tekstil Terbaik untuk Kreasi Anda
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
