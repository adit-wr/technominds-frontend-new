<template>
  <div class="item-list">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2>Daftar SPK Masuk</h2>
      </div>
      <div class="card-body">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th>SPK ID</th>
              <th>Nama Karyawan</th>
              <th>Nama Barang</th>
              <th>Quantity</th>
              <th>Tanggal Pengajuan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.spkId">
              <td>{{ item.spkId }}</td>
              <td>{{ item.employeeName || 'N/A' }}</td> 
              <td>{{ item.material?.name || 'N/A' }}</td> 
              <td>{{ item.quantityOrder }}</td>
              <td>{{ formatTanggal(item.tanggal_pengajuan) }}</td>
              <td>
                <span
                  :class="{
                    'badge badge-success': item.status === 'DONE',
                    'badge badge-warning': item.status === 'PENDING',
                  }"
                >
                  {{ item.status }}
                </span>
              </td>
              <td>
                <button
                  class="btn btn-primary btn-sm"
                  @click="openForm(item)"
                  v-if="item.status === 'PENDING'"
                >
                  <i class="bi bi-pencil-square"></i> Terima
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal untuk Form -->
    <FormSpk
      v-if="showForm"
      :visible="showForm"
      :item="selectedItem"
      @close="closeForm"
      @updateStatus="updateStatus"
    />
  </div>
</template>

<script>
import FormSpk from "@/views/wh_operator/FormSpk.vue";
import axios from "axios";

export default {
  components: {
    FormSpk,
  },
  data() {
    return {
      showForm: false, 
      selectedItem: null, 
      tableData: [], 
    };
  },
  mounted() {
    this.fetchSPKData(); 
  },
  methods: {
    // Fungsi untuk mengambil data SPK dari backend
    async fetchSPKData() {
      try {
        const token = localStorage.getItem("jwt_token"); 
        const response = await axios.get("http://localhost:3000/api/spk", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Memformat data SPK yang diterima
        this.tableData = response.data.map((item) => ({
          ...item,
          employeeName: item.user?.name || "N/A", 
          material: item.material || {}, 
        }));
      } catch (error) {
        console.error("Error fetching SPK data:", error);
      }
    },
    openForm(item) {
      this.selectedItem = { ...item }; 
      this.showForm = true; 
    },
    closeForm() {
      this.showForm = false; 
      this.selectedItem = null; 
    },
    updateStatus(updatedItem) {
      // Perbarui status item di tableData
      const index = this.tableData.findIndex(
        (item) => item.spkId === updatedItem.spkId
      );
      if (index !== -1) {
        this.tableData[index].status = updatedItem.status;
      }
      this.closeForm(); 
    },
    formatTanggal(tanggal) {
      if (!tanggal) return "Tidak Diketahui";
      const date = new Date(tanggal);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
.item-list {
  width: 100%;
}

/* Tabel styling */
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table th {
  background-color: #f8f9fa;
  color: #212529;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  border: 1px solid #dee2e6;
}

.table td {
  text-align: center;
  padding: 10px;
  border: 1px solid #dee2e6;
}

.table tbody tr:nth-child(odd) {
  background-color: #ffffff;
}

.table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.table tbody tr:hover {
  background-color: #e9ecef;
  cursor: pointer;
}

.table a {
  text-decoration: none;
  color: #007bff;
}

.table a:hover {
  text-decoration: underline;
}

/* Badge styling */
.badge {
  display: inline-block;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  border-radius: 5px;
}

.badge-success {
  background-color: #28a745;
}

.badge-warning {
  background-color: #ffc107;
}

/* Style untuk tampilan print */
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
  }
}
</style>
