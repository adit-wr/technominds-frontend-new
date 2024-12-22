<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
//import FormUserData from "@/views/ph_operator/FormUserData.vue";

const users = ref([]);
const isLoading = ref(false);
const selectedUser = reactive({
  userId: "",
  username: "",
  email: "",
  role: "",
  status: "",
});
const isEdit = ref(false);

// Fetch users only once when the component is mounted
function fetchUsers() {
  isLoading.value = true;
  const authStore = useAuthStore();

  axios
    .get("http://localhost:3000/api/user", {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    .then((response) => {
      users.value = response.data.filter((user) => user.role === "WH_OPERATOR");
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

// Handle Submit (update or add user)
async function handleSubmit(user) {
  const authStore = useAuthStore();
  isLoading.value = true;

  try {
    if (isEdit.value) {
      await axios.put(`http://localhost:3000/api/user/${user.userId}`, user, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
    } else {
      alert("Tidak ada fitur untuk menambah user.");
    }

    alert(
      isEdit.value ? "Data berhasil diperbarui!" : "Tidak ada perubahan data."
    );
  } catch (error) {
    console.error("Error saving user:", error);
    alert("Terjadi kesalahan saat menyimpan data.");
  } finally {
    isLoading.value = false;
  }
}

// Edit user data
function editUser(user) {
  Object.assign(selectedUser, user);
  isEdit.value = true;
}

// Close the form
function closeForm() {
  isEdit.value = false;
  Object.assign(selectedUser, {
    userId: "",
    username: "",
    email: "",
    role: "",
    status: "",
  });
}

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="master-data-container">
    <div class="card shadow-sm rounded-lg">
      <div class="card-header text-white p-4 d-flex justify-content-between align-items-center">
        <h2 class="text-xl font-weight-bold mb-0">User Data</h2>
      </div>

      <div class="card-body p-0">
        <div v-if="isLoading" class="text-center py-4">
          <span>Loading...</span>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="bg-light">
              <tr>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">User ID</th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">Username</th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">Email</th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">Role</th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">Status</th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.userId">
                <td class="py-3 px-4 font-weight-bold">{{ user.userId }}</td>
                <td class="py-3 px-4">{{ user.username }}</td>
                <td class="py-3 px-4">{{ user.email }}</td>
                <td class="py-3 px-4">{{ user.role }}</td>
                <td class="py-3 px-4">{{ user.status }}</td>
                <td class="py-3 px-4 text-center">
                  <div class="btn-group" role="group">
                    <button @click="editUser(user)" class="btn btn-outline-warning btn-sm me-2">
                      <i class="bi bi-pencil-square"></i> Update Status
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <ModalApp v-model:visible="showForm">
      <FormUserData
        :user="selectedUser"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </ModalApp>
  </div>
</template>

<style scoped>
.master-data-container {
  background-color: #f4f6f9;
  padding: 20px;
}

.card {
  border: none;
  overflow: hidden;
}

.table-hover tbody tr:hover {
  background-color: rgba(74, 144, 226, 0.05);
  transition: background-color 0.2s ease;
}

.badge {
  font-size: 0.8em;
  padding: 0.4em 0.6em;
}

.badge.bg-warning {
  background-color: #ffc107 !important;
}

.btn-group .btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .table-responsive {
    font-size: 0.9em;
  }

  .btn-group {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn-group .btn {
    width: 100%;
  }
}
</style>
