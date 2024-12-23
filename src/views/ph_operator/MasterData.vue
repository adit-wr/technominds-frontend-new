<template>
  <div class="item-list-container">
    <div class="card modern-card">
      <div class="card-header">
        <h2 class="card-title">Master Data Inventory</h2>
      </div>
      <div class="table-responsive">
        <table class="table modern-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Stok</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
             <tr v-for="material in materials" :key="material.materialId">
              <td>
                <div class="item-name">{{ material.materialId }}</div>
              </td>
              <td>
                <div class="item-name">{{ material.name }}</div>
              </td>
              <td>
                <div class="item-description text-muted">
                  {{ material.descriptions }}
                </div>
              </td>
              <td>
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
              <td>
                <div class="item-price text-primary fw-bold">
                  {{ material.status }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore"; // Pastikan jalur sesuai dengan lokasi authStore Anda.

export default {
  name: "MaterialsTable",
  data() {
    return {
      materials: [], // Inisialisasi data untuk menampung daftar material.
    };
  },
  methods: {
    fetchMaterials() {
      const authStore = useAuthStore(); // Mengambil token dari authStore.
      if (!authStore.token) {
        console.error("Token kosong! Tidak dapat melakukan permintaan API.");
        return;
      }

      axios
        .get("http://localhost:3000/api/materials", {
          headers: {
            Authorization: `Bearer ${authStore.token}`, // Menyertakan token di header Authorization.
          },
        })
        .then((response) => {
          this.materials = response.data; // Menyimpan data material dari respons API.
        })
        .catch((error) => {
          console.error("Error fetching materials:", error);
        });
    },
    formatPrice(price) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);
    },
  },
  mounted() {
    this.fetchMaterials(); // Memanggil metode fetchMaterials setelah komponen dimount.
  },
};
</script>


<style scoped>
.item-list-container {
  background-color: #f4f7fa;
  padding: 20px;
}

.modern-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.card-title {
  margin-bottom: 0;
  font-weight: 600;
  color: #333;
}

.add-item-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.modern-table {
  margin-bottom: 0;
}

.modern-table thead {
  background-color: #f1f3f5;
}

.modern-table thead th {
  color: #495057;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #dee2e6;
}

.modern-table tbody tr {
  transition: background-color 0.2s ease;
}

.modern-table tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
}

.item-name {
  font-weight: 600;
  color: #212529;
  padding: 5px;
}

.item-description {
  font-size: 0.9em;
  color: #6c757d;
}

.item-price {
  color: #28a745;
  font-weight: 600;
}

.badge {
  padding: 0.4em 0.6em;
  border-radius: 4px;
  font-weight: 500;
}

.btn-group .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  padding: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    gap: 15px;
  }

  .add-item-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
