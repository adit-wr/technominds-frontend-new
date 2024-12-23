<script setup>
import { ref, reactive } from "vue";
import ModalApp from "@/views/ModalApp.vue";
import FormMasterData from "@/views/wh_operator/FormMasterData.vue";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const materials = ref([]);
const isLoading = ref(false);
const showForm = ref(false);
const selectedItem = reactive({
  materialId: "",
  name: "",
  descriptions: "",
  quantity: "",
  status: "",
});
const isEdit = ref(false);

function fetchMaterials() {
  isLoading.value = true;
  const authStore = useAuthStore();

  axios
    .get("http://localhost:3000/api/materials", {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    .then((response) => {
      materials.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching materials:", error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

async function handleSubmit(item) {
  const authStore = useAuthStore();
  isLoading.value = true;

  try {
    if (isEdit.value) {
      await axios.put(
        `http://localhost:3000/api/materials/${item.materialId}`,
        item,
        {
          headers: { Authorization: `Bearer ${authStore.token}` },
        }
      );
    } else {
      await axios.post("http://localhost:3000/api/materials", item, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
    }

    await fetchMaterials(); // Sinkronisasi ulang data
    alert(isEdit.value ? "Data berhasil diperbarui!" : "Data berhasil ditambahkan!");
  } catch (error) {
    console.error("Error saving material:", error);
    // alert("Terjadi kesalahan saat menyimpan data.");
  } finally {
    isLoading.value = false;
    closeForm();
  }
}

function deleteItem(materialId) {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("Token kosong! Tidak dapat melakukan permintaan API.");
    return;
  }

  isLoading.value = true;

  axios
    .delete(`http://localhost:3000/api/materials/${materialId}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    .then(() => {
      materials.value = materials.value.filter(
        (item) => item.materialId !== materialId
      );
      alert("Item berhasil dihapus.");
    })
    .catch((error) => {
      console.error("Error deleting material:", error);
      alert("Terjadi kesalahan saat menghapus item.");
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function showAddForm() {
  Object.assign(selectedItem, {
    materialId: "",
    name: "",
    descriptions: "",
    quantity: "",
    status: "",
  });
  isEdit.value = false;
  showForm.value = true;
}

function editItem(item) {
  Object.assign(selectedItem, item);
  isEdit.value = true;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  isEdit.value = false;
  Object.assign(selectedItem, {
    materialId: "",
    name: "",
    descriptions: "",
    quantity: "",
    status: "",
  });
}

function confirmDeleteItem(item) {
  const isConfirmed = window.confirm(
    `Apakah Anda yakin ingin menghapus item "${item.name}"?`
  );
  if (isConfirmed) {
    deleteItem(item.materialId);
  }
}

fetchMaterials();
</script>

<template>
  <div class="master-data-container">
    <!-- Header dan Tombol Tambah -->
    <div class="card shadow-sm rounded-lg">
      <div
        class="card-header text-white p-4 d-flex justify-content-between align-items-center"
      >
        <h2 class="text-xl font-weight-bold mb-0">Master Data Inventory</h2>
        <button
          @click="showAddForm"
          class="btn btn-light d-flex align-items-center"
        >
          <i class="bi bi-clipboard2-plus me-2"></i> Tambah Item
        </button>
      </div>

      <!-- Tabel Data -->
      <div class="card-body p-0">
        <div v-if="isLoading" class="text-center py-4">
          <span>Loading...</span>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="bg-light">
              <tr>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Nama
                </th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Deskripsi
                </th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Stok
                </th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Status
                </th>
                <th
                  class="py-3 px-4 text-muted text-uppercase font-weight-bold text-center"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="material in materials" :key="material.materialId">
                <td class="py-3 px-4 font-weight-bold">{{ material.name }}</td>
                <td class="py-3 px-4 text-muted">{{ material.descriptions }}</td>
                <td class="py-3 px-4">
                  <span
                    class="badge"
                    :class="{
                      'bg-success': material.quantity > 200,
                      'bg-warning': material.quantity <= 200 && material.quantity > 50,
                      'bg-danger': material.quantity <= 50,
                    }"
                  >
                    {{ material.quantity }}
                  </span>
                </td>
                <td class="py-3 px-4 font-weight-bold text-primary">
                  {{ material.status }}
                </td>
                <td class="py-3 px-4 text-center">
                  <div class="btn-group" role="group">
                    <button
                      @click="editItem(material)"
                      class="btn btn-outline-warning btn-sm me-2"
                    >
                      <i class="bi bi-pencil-square"></i> Edit
                    </button>
                    <button
                      @click="confirmDeleteItem(material)"
                      class="btn btn-outline-danger btn-sm"
                    >
                      <i class="bi bi-trash3"></i> Delete
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
      <FormMasterData
        :material="selectedItem"
        :item="selectedItem"
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
