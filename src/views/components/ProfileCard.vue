<template>
  <div class="card card-profile">
    <!-- Background Image -->
    <img
      src="../../assets/img/bg-profile.jpg"
      alt="Image placeholder"
      class="card-img-top"
    />

    <div class="row justify-content-center">
      <!-- Profile Image -->
      <div class="col-4 col-lg-4 order-lg-2">
        <div class="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
          <a href="javascript:;">
            <img
              src="../../assets/img/team-3.jpg"
              class="rounded-circle img-fluid border border-2 border-white"
            />
          </a>
        </div>
      </div>
    </div>

    <!-- Profile Header Section -->
    <div class="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
      <!-- Work Status Dropdown -->
      <div class="form-group mb-3">
        <label for="status" placeholder="Status Kerja">Status Kerja:</label>
        <select v-model="status" class="form-control" id="status">
          <option value="off">Off</option>
          <option value="free">Free</option>
          <option value="on duty">On Duty</option>
        </select>
      </div>

      <!-- Update Status Button -->
      <div class="mt-3">
        <button class="btn btn-primary" @click="updateStatus">Update Status</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define the status variable
import { ref } from 'vue';

const status = ref('off'); // Default value is 'off'

// Method to show alert when status is updated
const updateStatus = () => {
  alert(`Status kerja berhasil di update ke: ${status.value}`);
};
</script>

<style scoped>
/* You can add specific styles for the dropdown and profile card */
</style>
