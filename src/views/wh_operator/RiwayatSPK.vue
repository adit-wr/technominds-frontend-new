<template>
  <div class="item-list">
    <div class="card">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <h2>Riwayat SPK Masuk</h2>
        <button @click="print" class="btn btn-primary">
          <i class="bi bi-printer"></i> Cetak Laporan
        </button>
      </div>
      <div class="card-body" id="print-section">
        <table class="table table-bordered">
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
              <td>
                <span
                  class="badge"
                  :class="{
                    'badge-success': item.status === 'done',
                    'badge-warning': item.status === 'pending',
                  }"
                >
                  {{ item.status }}
                </span>
              </td>
              <td>
                <a :href="item.pdfLink" target="_blank">Unduh PDF</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
    };
  },
  methods: {
    print() {
      window.print();
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
