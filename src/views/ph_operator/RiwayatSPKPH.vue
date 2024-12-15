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
              <th>SPK</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="history in histories" :key="history.id">
              <td>
                <span class="text-muted">#{{ history.id }}</span>
              </td>
              <td>
                <div class="employee-name">{{ history.namaKaryawan }}</div>
              </td>
              <td>
                <div class="text-muted">{{ formatDate(history.tanggalPengajuan) }}</div>
              </td>
              <td>
                <a 
                  :href="history.spkLink" 
                  target="_blank" 
                  class="btn-download"
                >
                  <i class="bi bi-download me-2"></i>Unduh SPK
                </a>
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
export default {
  name: "HistoryList",
  data() {
    return {
      histories: [
        {
          id: 1,
          namaKaryawan: "Doni Monardo",
          tanggalPengajuan: "2024-01-01",
          spkLink: "https://drive.google.com/file/d/1eE_L0n1G8gc66qSkm6UtCsBocnFc78_j/view?usp=sharing",
          status: "Done",
        },
        {
          id: 2,
          namaKaryawan: "Siti Rahayu",
          tanggalPengajuan: "2024-01-02",
          spkLink: "https://drive.google.com/file/d/1eE_L0n1G8gc66qSkm6UtCsBocnFc78_j/view?usp=sharing",
          status: "Pending",
        },
        {
          id: 3,
          namaKaryawan: "Ahmad Rifai",
          tanggalPengajuan: "2024-01-03",
          spkLink: "https://drive.google.com/file/d/1eE_L0n1G8gc66qSkm6UtCsBocnFc78_j/view?usp=sharing",
          status: "Rejected",
        },
        {
          id: 4,
          namaKaryawan: "Budi Hartono",
          tanggalPengajuan: "2024-01-04",
          spkLink: "https://drive.google.com/file/d/1eE_L0n1G8gc66qSkm6UtCsBocnFc78_j/view?usp=sharing",
          status: "Done",
        },
      ],
    };
  },
  methods: {
    print() {
      window.print();
    },
    formatDate(dateString) {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },
    getStatusClass(status) {
      return {
        'badge-success': status.toLowerCase() === 'done',
        'badge-warning': status.toLowerCase() === 'pending',
        'badge-danger': status.toLowerCase() === 'rejected'
      };
    }
  },
};
</script>

<style scoped>
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

.btn-download {
  color: #007bff;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-weight: 500;
  transition: color 0.2s ease;
}

.btn-download:hover {
  color: #0056b3;
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

/* Responsive Adjustments */
@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    gap: 15px;
  }

  .header-actions {
    width: 100%;
  }

  .print-btn {
    width: 100%;
    justify-content: center;
  }

  .modern-table {
    font-size: 0.9rem;
  }
}
</style>