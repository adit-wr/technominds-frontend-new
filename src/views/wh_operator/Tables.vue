<script setup>
import { ref } from "vue";
import ModalApp from "@/views/ModalApp.vue";
import FormMasterData from "@/views/wh_operator/FormMasterData.vue";

const items = ref([
  {
    id: 1,
    name: "Benang Poliéster",
    deskripsi: "Benang berkualitas tinggi untuk menjahit",
    stok: 500,
    price: "100.000",
  },
  {
    id: 2,
    name: "Kain Katun",
    deskripsi: "Kain katun untuk pembuatan pakaian",
    stok: 200,
    price: "250.000",
  },
  {
    id: 3,
    name: "Kain Spandex",
    deskripsi: "Kain elastis untuk pakaian olahraga",
    stok: 150,
    price: "300.000",
  },
  {
    id: 4,
    name: "Kain Satin",
    deskripsi: "Kain satin untuk busana formal",
    stok: 100,
    price: "500.000",
  },
  {
    id: 5,
    name: "Dye (Pewarna)",
    deskripsi: "Pewarna tekstil untuk memberikan warna pada kain",
    stok: 300,
    price: "50.000",
  },
  {
    id: 6,
    name: "Bahan Pelapis",
    deskripsi: "Bahan untuk pelapisan kain",
    stok: 250,
    price: "200.000",
  },
  {
    id: 7,
    name: "Furnitur Mesin Jahit",
    deskripsi: "Peralatan untuk memproduksi pakaian",
    stok: 20,
    price: "15.000.000",
  },
]);

const showForm = ref(false);
const selectedItem = ref(null);
const isEdit = ref(false);

function showAddForm() {
  selectedItem.value = { id: "", name: "", deskripsi: "", stok: "", price: "" };
  isEdit.value = false;
  showForm.value = true;
}

function editItem(item) {
  selectedItem.value = { ...item };
  isEdit.value = true;
  showForm.value = true;
}

function handleSubmit(item) {
  if (isEdit.value) {
    const index = items.value.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      items.value.splice(index, 1, item);
    }
  } else {
    item.id = Date.now();
    items.value.push(item);
  }
  showForm.value = false;
  selectedItem.value = null;
  isEdit.value = false;
}

function cancelEditForm() {
  showForm.value = false;
  isEdit.value = false;
  selectedItem.value = null;
}

function confirmDeleteItem(item) {
  const isConfirmed = window.confirm(
    `Apakah Anda yakin ingin menghapus item "${item.name}"?`
  );
  if (isConfirmed) {
    deleteItem(item.id);
  }
}

function deleteItem(id) {
  items.value = items.value.filter((item) => item.id !== id);
}
</script>

<template>
  <div class="master-data-container">
    <div class="card shadow-sm rounded-lg">
      <div class="card-header text-white p-4 d-flex justify-content-between align-items-center">
        <h2 class="text-xl font-weight-bold mb-0">Master Data Inventory</h2>
        <button @click="showAddForm" class="btn btn-light d-flex align-items-center">
          <i class="bi bi-clipboard2-plus me-2"></i> Tambah Item
        </button>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="bg-light">
              <tr>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">Nama</th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">Deskripsi</th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">Stok</th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">Harga</th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id" class="hover-highlight">
                <td class="py-3 px-4 font-weight-bold">{{ item.name }}</td>
                <td class="py-3 px-4 text-muted">{{ item.deskripsi }}</td>
                <td class="py-3 px-4">
                  <span class="badge bg-success" :class="{'bg-warning': item.stok < 100}">
                    {{ item.stok }}
                  </span>
                </td>
                <td class="py-3 px-4 font-weight-bold text-primary">Rp {{ item.price }}</td>
                <td class="py-3 px-4 text-center">
                  <div class="btn-group" role="group">
                    <button @click="editItem(item)" class="btn btn-outline-warning btn-sm me-2">
                      <i class="bi bi-pencil-square"></i> Edit
                    </button>
                    <button
                      @click="confirmDeleteItem(item)"
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

    <ModalApp :visible="showForm" @close="cancelEditForm">
      <FormMasterData
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="cancelEditForm"
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