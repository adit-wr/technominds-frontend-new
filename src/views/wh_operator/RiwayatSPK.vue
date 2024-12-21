<template>
  <div class="history-container">
    <div class="card modern-card">
      <div class="card-header">
        <h2 class="card-title">Riwayat Pengajuan SPK</h2>
        <div class="header-actions">
          <button @click="print" class="btn btn-primary print-btn">
            <i class="bi bi-printer me-2"></i>Cetak Laporan
          </button>
        </div>
      </div>

      <div class="table-responsive" id="print-section">
        <table class="modern-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Karyawan</th>
              <th>Tanggal Pengajuan</th>
              <th>Nama Barang</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="history in spk" :key="history.spkId">
              <td>
                <span class="text-muted">#{{ history.spkId }}</span>
              </td>
              <td>
                <div class="employee-name">{{ history.nama_karyawan }}</div>
              </td>
              <td>
                <div class="text-muted">{{ history.tanggal_pengajuan }}</div>
              </td>
              <td>
                <div class="text-muted">{{ history.nama_barang }}</div>
              </td>
              <td>
                <div class="text-muted">{{ history.quantityOrder }}</div>
              </td>
              <td>
                <span
                  class="badge"
                  :class="getStatusClass(history.status)"
                >
                  {{ history.status }}
                </span>
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
import { useAuthStore } from "@/store/authStore";

export default {
  name: "RiwayatSPK",
  data() {
    return {
      spk: [],
    };
  },
  methods: {
    // Fetch nama karyawan berdasarkan userId
    async fetchUserDetails(userId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${useAuthStore().token}`,
          },
        });
        return response.data.username; // Return username
      } catch {
        return 'Unknown User';
      }
    },

    // Fetch nama barang berdasarkan materialId
    async fetchMaterialDetails(materialId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/materials/${materialId}`, {
          headers: {
            Authorization: `Bearer ${useAuthStore().token}`,
          },
        });
        return response.data.name || 'N/A'; // Return nama barang
      } catch {
        return 'N/A';
      }
    },

    // Fetch data SPK dan menambahkan nama karyawan dan nama barang
    async fetchMaterials() {
      const authStore = useAuthStore();
      if (!authStore.token) {
        console.error("Token kosong! Tidak dapat melakukan permintaan API.");
        return;
      }
      console.log("Authorization Header:", `Bearer ${authStore.token}`);
      try {
        const response = await axios.get("http://localhost:3000/api/spk", {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        // Gunakan Promise.all untuk menunggu semua request nama karyawan dan nama barang selesai
        const spkWithNames = await Promise.all(response.data.map(async (item) => {
          const namaKaryawan = await this.fetchUserDetails(item.userId); // Tunggu nama karyawan
          const namaBarang = await this.fetchMaterialDetails(item.materialId); // Tunggu nama barang
          return {
            spkId: item.spkId,
            nama_karyawan: namaKaryawan, // Update dengan nama karyawan
            tanggal_pengajuan: new Date(item.tanggal_pengajuan).toLocaleDateString(),
            nama_barang: namaBarang, // Update dengan nama barang
            quantityOrder: item.quantityOrder,
            status: item.status,
          };
        }));

        this.spk = spkWithNames; // Update spk dengan data baru
      } catch (error) {
        console.error("Error fetching SPK:", error);
      }
    },

    // Mendapatkan kelas CSS berdasarkan status SPK
    getStatusClass(status) {
      switch (status) {
        case "DONE":
          return "badge-success";
        case "PENDING":
          return "badge-warning";
        case "ON_PROCESS":
          return "badge-danger";
        default:
          return "";
      }
    },

    // Cetak tabel sebagai laporan
    print() {
      window.print();
    },
  },
  mounted() {
    this.fetchMaterials(); 
  },
};
</script>

<style scoped>
/* Tambahkan CSS lengkap dari kode sebelumnya */
.history-container {
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
  font-size: 1.25rem;
}

.print-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.modern-table thead {
  background-color: #f1f3f5;
}

.modern-table thead th {
  padding: 15px;
  text-align: left;
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

.modern-table tbody td {
  padding: 15px;
  vertical-align: middle;
  border-bottom: 1px solid #e9ecef;
}

.employee-name {
  font-weight: 600;
  color: #212529;
}

.badge {
  padding: 0.4em 0.7em;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

.badge-success {
  background-color: rgba(40, 167, 69, 0.1);
  color: #28a745;
}

.badge-warning {
  background-color: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}

.badge-danger {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}

/* Print Styles */
@media print {
  body * {
    visibility: hidden;
  }
  #print-section,
  #print-section * {
    visibility: visible;
  }
  #print-section {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>
