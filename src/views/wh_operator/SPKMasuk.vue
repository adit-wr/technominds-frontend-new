<template>
  <div class="history-container">
    <div class="card modern-card">
      <div class="card-header">
        <h2 class="card-title">Pengajuan SPK Masuk</h2>
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
              <th>Aksi</th>
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
              <td>
                <!-- Tombol "Terima" -->
                <button
                  class="btn btn-success btn-sm"
                  @click="acceptSPK(history.spkId)"
                  :disabled="history.status === 'ON_PROCESS' || history.status === 'DONE'"
                >
                  Update SPK
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ModalApp v-model:visible="showForm">
      <FormSpk
        :spk="selectedUser"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </ModalApp>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
//import FormSpk from "@/views/ph_operator/FormSpk.vue";

export default {
  name: "RiwayatSPK",
  data() {
    return {
      spk: [], 
      //FormSpk,
    };
  },
  methods: {
    // Fetch data karyawan berdasarkan userId
    async fetchUserDetails(userId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${useAuthStore().token}`,
          },
        });
        return response.data.username || "Unknown User";
      } catch {
        return "Unknown User";
      }
    },

    // Fetch data barang berdasarkan materialId
    async fetchMaterialDetails(materialId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/materials/${materialId}`, {
          headers: {
            Authorization: `Bearer ${useAuthStore().token}`,
          },
        });
        return response.data.name || "N/A";
      } catch {
        return "N/A";
      }
    },

    // Fetch data SPK dan lengkapi data nama karyawan dan barang
    async fetchMaterials() {
      const authStore = useAuthStore();
      if (!authStore.token) {
        console.error("Token kosong! Tidak dapat melakukan permintaan API.");
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/api/spk", {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        const spkWithDetails = await Promise.all(
          response.data.map(async (item) => {
            const namaKaryawan = await this.fetchUserDetails(item.userId);
            const namaBarang = await this.fetchMaterialDetails(item.materialId);
            return {
              spkId: item.spkId,
              nama_karyawan: namaKaryawan,
              tanggal_pengajuan: new Date(item.tanggal_pengajuan).toLocaleDateString(),
              nama_barang: namaBarang,
              quantityOrder: item.quantityOrder,
              status: item.status,
            };
          })
        );

        this.spk = spkWithDetails;
      } catch (error) {
        console.error("Error fetching SPK:", error);
      }
    },

    // Perbarui status SPK menjadi "ON_PROCESS"
    async acceptSPK(spkId) {
      try {
        const authStore = useAuthStore();
        const response = await axios.patch(
          `http://localhost:3000/api/spk/${spkId}/accept`,
          { status: "ON_PROCESS" },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );
        console.log("SPK diterima:", response.data);

        // Perbarui data di frontend
        const spkIndex = this.spk.findIndex((spk) => spk.spkId === spkId);
        if (spkIndex !== -1) {
          this.spk[spkIndex].status = "ON_PROCESS";
        }
      } catch (error) {
        console.error("Error menerima SPK:", error);
      }
    },

    // Menentukan kelas CSS berdasarkan status
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
  },
  mounted() {
    this.fetchMaterials();
  },
};
</script>

<style scoped>
/* CSS Lengkap */
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

.modern-table tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
}

.modern-table tbody td {
  padding: 15px;
  vertical-align: middle;
  border-bottom: 1px solid #e9ecef;
}

.btn {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.btn-sm {
  font-size: 0.8rem;
}

.btn-success {
  background-color: #28a745;
  color: white;
  border: none;
}

.btn-success:disabled {
  background-color: #c3e6cb;
  color: #6c757d;
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
</style>
