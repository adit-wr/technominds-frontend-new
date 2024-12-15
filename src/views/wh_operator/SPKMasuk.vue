<template>
  <div class="item-list">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2>Riwayat SPK Masuk</h2>
        <button @click="print" class="btn btn-primary">
          <i class="bi bi-printer"></i> Cetak Laporan
        </button>
      </div>
      <div class="card-body" id="print-section">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Karyawan</th>
              <th>Tanggal Pengajuan</th>
              <th>Status</th>
              <th>SPK</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in riwayat" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.tanggal }}</td>
              <td>{{ item.status }}</td>
              <td>
                <a :href="item.pdfLink" target="_blank">Unduh PDF</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Modal :visible="showForm" @close="cancelEditForm">
      <ItemForm
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="cancelEditForm"
      />
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      riwayat: [
        { id: 1, name: "Budi", tanggal: "2024-01-01", status: "done", pdfLink: "/path/to/pdf1.pdf" },
        { id: 2, name: "Andi", tanggal: "2024-01-02", status: "done", pdfLink: "/path/to/pdf2.pdf" },
        { id: 3, name: "Dodi", tanggal: "2024-01-03", status: "done", pdfLink: "/path/to/pdf3.pdf" },
        { id: 4, name: "Krisna", tanggal: "2024-01-04", status: "done", pdfLink: "/path/to/pdf4.pdf" },
        { id: 5, name: "Asep", tanggal: "2024-01-05", status: "done", pdfLink: "/path/to/pdf5.pdf" },
        { id: 6, name: "Wulan", tanggal: "2024-01-06", status: "done", pdfLink: "/path/to/pdf6.pdf" },
        { id: 7, name: "Aisyah", tanggal: "2024-01-07", status: "done", pdfLink: "/path/to/pdf7.pdf" },
      ],
      showForm: false,
      selectedItem: null,
      isEdit: false,
    };
  },
  methods: {
    print() {
      window.print();
    },
    showAddForm() {
      this.selectedItem = { id: "", name: "", tanggal: "", status: "done", pdfLink: "" };
      this.isEdit = false;
      this.showForm = true;
    },
    editItem(item) {
      this.selectedItem = { ...item };
      this.isEdit = true;
      this.showForm = true;
    },
    handleSubmit(item) {
      if (this.isEdit) {
        const index = this.riwayat.findIndex((i) => i.id === item.id);
        if (index !== -1) {
          this.riwayat.splice(index, 1, item);
        }
      } else {
        item.id = Date.now(); // Assign unique ID for new items
        this.riwayat.push(item);
      }
      this.showForm = false;
      this.selectedItem = null;
      this.isEdit = false;
    },
    cancelEditForm() {
      this.showForm = false;
      this.isEdit = false;
      this.selectedItem = null;
    },
    deleteItem(id) {
      this.riwayat = this.riwayat.filter((item) => item.id !== id);
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
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden; /* Untuk membuat sudut tabel lebih rapi */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
  padding: 15px;
}

.table thead {
  background-color: #fff; /* Biru khas Bootstrap */
  color: white;
}

.table tbody tr:nth-child(odd) {
  background-color: #f8f9fa; /* Abu-abu terang */
}

.table tbody tr:nth-child(even) {
  background-color: #ffffff; /* Putih */
}

.table tbody tr:hover {
  background-color: #d1ecf1; /* Warna biru muda saat hover */
  cursor: pointer;
}

.table a {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.table a:hover {
  text-decoration: underline;
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
