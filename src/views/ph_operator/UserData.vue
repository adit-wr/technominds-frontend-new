<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';

// Ambil instance store untuk user
const userStore = useUserStore();

// Variabel untuk menyimpan data user
const user = ref({
  username: '',
  email: '',
  status: '',
});

// Variabel untuk menyimpan status yang baru dipilih
const newStatus = ref('FREE');

// Fungsi untuk mengambil data pengguna berdasarkan login
const fetchUserData = async () => {
  try {
    const userId = userStore.userId;
    const token = userStore.token;

    // Kirim token dalam header Authorization
    const response = await axios.get(`http://localhost:3000/api/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    const data = response.data;

    // Simpan data pengguna ke variabel `user`
    user.value = {
      username: data.username,
      email: data.email,
      status: data.status,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Fungsi untuk mengupdate status
const updateStatus = async () => {
  try {
    const userId = userStore.userId;
    const token = userStore.token;

    // Kirim permintaan update status
    // eslint-disable-next-line
    const response = await axios.put(
      `http://localhost:3000/api/user/${userId}`,
      { status: newStatus.value },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    // Perbarui status pengguna setelah berhasil
    user.value.status = newStatus.value;
  } catch (error) {
    console.error('Error updating status:', error);
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
      <div class="page-header min-height-300" style="background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'); margin-right: -24px; margin-left: -34%;">
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
                <h5 class="mb-1">Warehouse Operator</h5>
                <p class="mb-0 font-weight-bold text-sm">{{ user.status || 'FREE' }}</p>
              </div>
            </div>
          </div>
          <!-- Dropdown untuk memilih status -->
          <div class="mt-3">
            <select v-model="newStatus" class="form-select">
              <option value="FREE">FREE</option>
              <option value="OFF">OFF</option>
              <option value="ON_DUTY">ON DUTY</option>
            </select>
            <button class="btn btn-primary mt-3" @click="updateStatus">Update Status</button>
          </div>
        </div>
      </div>

      <!-- Main Content Row -->
      <div class="py-4 container-fluid">
        <div class="row">
          <!-- WH Operator Information Table -->
          <div class="col-md-8">
            <div class="card">
              <div class="card-header pb-0">
                <div class="d-flex align-items-center">
                  <p class="mb-0">WH Operator Information</p>
                </div>
              </div>
              <div class="card-body">
                <!-- Tabel untuk menampilkan data pengguna -->
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Username</td>
                      <td>{{ user.username || 'Ilman Irawan' }}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{{ user.email || 'ilmanirawan01@gmail.com' }}</td>
                    </tr>
                    <tr>
                      <td>Status Kerja</td>
                      <td>{{ user.status || 'FREE' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container-fluid {
  width: 100%;
}

.card-header p {
  font-weight: bold;
  font-size: 1.2rem;
}

.table th, .table td {
  vertical-align: middle;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.table td {
  background-color: #ffffff;
}

.table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tbody tr:hover {
  background-color: #e9ecef;
}
</style>
