<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/store/userStore'; // Pastikan import dari store
// eslint-disable-next-line
import ProfileCard from "../components/ProfileCard.vue";
import ArgonInput from "@/components/ArgonInput.vue";
// eslint-disable-next-line
import ArgonButton from "@/components/ArgonButton.vue";

// Ambil instance store untuk user
const userStore = useUserStore();

// Variabel untuk menyimpan data user dan status
const user = ref({
  username: '',
  email: '',
  status: '',
});

// Fungsi untuk mengambil data pengguna dari API
const fetchUserData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/user');
    const data = response.data;
    user.value = {
      username: data.username,
      email: data.email,
      status: data.status,
    };
    userStore.setUser(user.value); // Simpan data ke Pinia store (jika perlu)
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Fungsi untuk memperbarui status pengguna di API
const updateStatus = async (newStatus) => {
  try {
    const response = await axios.put('http://localhost:3000/api/user', {
      status: newStatus,
    });
    if (response.status === 200) {
      user.value.status = newStatus; // Update status di UI
      alert('Status updated successfully!');
    }
  } catch (error) {
    console.error('Error updating user status:', error);
  }
};

// Memanggil API untuk mengambil data saat komponen dimuat
onMounted(() => {
  fetchUserData();
});
</script>

<template>
  <main>
    <div class="container-fluid">
      <!-- Header -->
      <div
        class="page-header min-height-300"
        style="background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'); margin-right: -24px; margin-left: -34%;">
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>

      <!-- Main Card -->
      <div class="card shadow-lg mt-n6">
        <div class="card-body p-3">
          <div class="row gx-4">
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img src="@/assets/img/team-3.jpg" alt="profile_image" class="shadow-sm w-100 border-radius-lg" />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">{{ user.username || 'Loading...' }}</h5>
                <p class="mb-0 font-weight-bold text-sm">{{ user.status || 'Loading...' }}</p>
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
                  <p class="mb-0">WH Operator Information</p>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <label for="username" class="form-control-label">Username</label>
                    <argon-input type="text" :value="user.username" readonly />
                  </div>
                  <div class="col-md-6">
                    <label for="email" class="form-control-label">Email address</label>
                    <argon-input type="email" :value="user.email" readonly />
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-md-6">
                    <label for="status" class="form-control-label">Status</label>
                    <select v-model="user.status" @change="updateStatus(user.status)" class="form-control">
                      <option value="FREE">FREE</option>
                      <option value="OFF">OFF</option>
                      <option value="ON_DUTY">ON DUTY</option>
                    </select>
                    <br>
                    <button type="submit" class="btn btn-primary">Update Status</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Card
          <div class="col-md-4">
            <profile-card />
          </div> -->
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container-fluid{
  width: 100%;
}
</style>
