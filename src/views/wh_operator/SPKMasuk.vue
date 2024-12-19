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
              <th>Id</th>
              <th>Nama Karyawan</th>
              <th>SPK</th>
              <th>Tanggal Pengajuan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.namaKaryawan }}</td>
              <td>
                <a :href="item.spk" target="_blank">Download PDF</a>
              </td>
              <td>{{ item.tanggalPengajuan }}</td>
              <td>{{ item.status }}</td>
              <td>
                <button
                  class="btn btn-primary btn-sm"
                  @click="openForm(item)"
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
          id: 1,
          namaKaryawan: "John Doe",
          spk: "https://drive.google.com/file/d/1eE_L0n1G8gc66qSkm6UtCsBocnFc78_j/view?usp=sharing",
          tanggalPengajuan: "2024-11-01",
          status: "On Process",
        },
        {
          id: 2,
          namaKaryawan: "Jane Smith",
          spk: "https://drive.google.com/file/d/1eE_L0n1G8gc66qSkm6UtCsBocnFc78_j/view?usp=sharing",
          tanggalPengajuan: "2024-11-02",
          status: "On Process",
        },
        {
          id: 3,
          namaKaryawan: "Michael Johnson",
          spk: "https://drive.google.com/file/d/1eE_L0n1G8gc66qSkm6UtCsBocnFc78_j/view?usp=sharing",
          tanggalPengajuan: "2024-11-03",
          status: "Done",
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
      const index = this.tableData.findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        this.tableData[index].status = updatedItem.status;
      }
      this.closeForm(); // Tutup modal
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
 
