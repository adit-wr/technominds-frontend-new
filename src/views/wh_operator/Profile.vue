<script setup>
import { onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { useUIStore } from "@/store/uiStore";

import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ProfileCard from "../components/ProfileCard.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const uiStore = useUIStore();
const body = document.getElementsByTagName("body")[0];

onMounted(() => {
  uiStore.setProfileLayout();
  setNavPills();
  setTooltip();
});

onBeforeMount(() => {
  body.classList.add("profile-overview");
});

onBeforeUnmount(() => {
  uiStore.resetLayout();
  body.classList.remove("profile-overview");
});
</script>

<template>
  <main>
    <div class="container-fluid">
      <!-- Header -->
      <div
        class="page-header min-height-300"
        style="
          background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
          margin-right: -24px;
          margin-left: -34%;
        "
      >
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>

      <!-- Main Card -->
      <div class="card shadow-lg mt-n6">
        <div class="card-body p-3">
          <div class="row gx-4">
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img
                  src="@/assets/img/team-3.jpg"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">Doni Monardo</h5>
                <p class="mb-0 font-weight-bold text-sm">WH Operator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Row -->
      <div class="py-4 container-fluid">
        <div class="row">
          <!-- Edit Profile Form -->
          <div class="col-md-8">
            <div class="card">
              <div class="card-header pb-0">
                <div class="d-flex align-items-center">
                  <p class="mb-0">Update Profile</p>
                  <argon-button color="success" size="sm" class="ms-auto"
                    >Update</argon-button
                  >
                </div>
              </div>
              <div class="card-body">
                <p class="text-uppercase text-sm">User Information</p>
                <div class="row">
                  <div class="col-md-6">
                    <label for="username" class="form-control-label"
                      >Username</label
                    >
                    <argon-input type="text" value="lucky.jesse" />
                  </div>
                  <div class="col-md-6">
                    <label for="email" class="form-control-label"
                      >Email address</label
                    >
                    <argon-input type="email" value="jesse@example.com" />
                  </div>
                  <div class="col-md-6">
                    <label for="firstname" class="form-control-label"
                      >First name</label
                    >
                    <argon-input type="text" value="Jesse" />
                  </div>
                  <div class="col-md-6">
                    <label for="lastname" class="form-control-label"
                      >Last name</label
                    >
                    <argon-input type="text" value="Lucky" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Card -->
          <div class="col-md-4">
            <profile-card />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
