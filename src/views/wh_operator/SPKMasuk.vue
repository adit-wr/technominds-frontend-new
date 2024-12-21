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
              <td>{{ item.nama_karyawan }}</td>
              <td>{{ item.nama_barang }}</td>
              <td>{{ item.quantity }}</td>
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

export default {
  components: {
    FormSpk,
  },
  data() {
    return {
      showForm: false, // Kontrol visibilitas modal
      selectedItem: null, // Item yang dipilih
      tableData: [
        {
          spkId: 1,
          nama_karyawan: "John Doe",
          tanggal_pengajuan: "2024-11-01",
          penerima: "Admin WH",
          nama_barang: "Barang A",
          quantity: 10,
          status: "PENDING",
        },
        {
          spkId: 2,
          nama_karyawan: "Jane Smith",
          tanggal_pengajuan: "2024-11-02",
          penerima: "Admin WH",
          nama_barang: "Barang B",
          quantity: 5,
          status: "PENDING",
        },
        {
          spkId: 3,
          nama_karyawan: "Michael Johnson",
          tanggal_pengajuan: "2024-11-03",
          penerima: "Admin WH",
          nama_barang: "Barang C",
          quantity: 15,
          status: "DONE",
        },
      ],
    };
  },
  methods: {
    openForm(item) {
      this.selectedItem = { ...item }; // Salin data item ke modal
      this.showForm = true; // Tampilkan modal
    },
    closeForm() {
      this.showForm = false; // Sembunyikan modal
      this.selectedItem = null; // Reset data
    },
    updateStatus(updatedItem) {
      // Perbarui status item di tableData
      const index = this.tableData.findIndex((item) => item.spkId === updatedItem.spkId);
      if (index !== -1) {
        this.tableData[index].status = updatedItem.status;
      }
      this.closeForm(); // Tutup modal
    },
    formatTanggal(tanggal) {
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
