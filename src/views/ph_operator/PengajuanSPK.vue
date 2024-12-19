<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-sm">
      <h2 class="text-center">Pengajuan SPK</h2>
      <form @submit.prevent="submitSPK">
        <div class="mb-3">
          <label for="userId" class="form-label">Nama Karyawan</label>
          <input
            type="text"
            class="form-control"
            id="userId"
            v-model="userId"
            @blur="fetchEmployeeName"
            required
            disabled
          />
          <small v-if="employeeName">Nama Karyawan: {{ employeeName }}</small>
          <!-- Menampilkan nama karyawan -->
        </div>
        <div class="mb-3">
          <label for="spkFile" class="form-label">Upload SPK</label>
          <input
            type="file"
            class="form-control"
            id="file"
            @change="handleFileUpload"
            required
          />
        </div>
        <div class="mb-3">
          <label for="submissionDate" class="form-label">Tanggal</label>
          <input
            type="date"
            class="form-control"
            id="tanggal_pengajuan"
            v-model="submissionDate"
            required
          />
        </div>

        <div class="mb-3">
          <label for="operator" class="form-label">Penerima</label>
          <select class="form-select" v-model="penerima" required>
            <option
              v-for="operator in operators"
              :key="operator.name"
              :value="operator.name"
            >
              {{ operator.name }} || {{ operator.status }}
            </option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">Kirim</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SPKForm",
  data() {
    return {
      userId: "",
      file: null,
      tanggal_pengajuan: "",
      penerima: "",
      employeeName: "",  // Untuk menyimpan nama karyawan
      operators: [
        { name: "Doni Monardo", status: "Free" },
        { name: "Imelda Kartiwa", status: "Off" },
        { name: "Intal Amelia", status: "On Duty" },
        { name: "Jefri Ananda", status: "Off" },
      ],
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0]; // Menggunakan this.file agar konsisten
    },
    
    // Fungsi untuk mengambil data nama karyawan berdasarkan userId
    async fetchEmployeeName() {
      if (this.userId) {
        try {
          const token = localStorage.getItem('jwt_token');  // Ambil token dari localStorage
          const response = await axios.get(`http://localhost:3000/api/user/${this.userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          this.employeeName = response.data.name;  // Menyimpan nama karyawan
        } catch (error) {
          console.error('Gagal mengambil data karyawan:', error);
          this.employeeName = "";  // Jika error, reset nama karyawan
        }
      }
    },
    
    async submitSPK() {
      const formData = new FormData();
      formData.append("user", this.userId);
      formData.append("file", this.file);
      formData.append("tanggal_pengajuan", this.tanggal_pengajuan);
      formData.append("penerima", this.penerima);

      try {
        const token = localStorage.getItem('jwt_token');
        const response = await axios.post('http://localhost:3000/api/spk', formData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        alert('Data berhasil disubmit!');
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
        alert('Gagal mengirim data.');
      }

      // Reset form fields after submission
      this.userId = "";
      this.file = null;
      this.tanggal_pengajuan = "";
      this.penerima = "";
      this.employeeName = "";  // Reset nama karyawan setelah submit
    }
  },
};
</script>
<style scoped>
.container {
  max-width: 100%;
}

.card {
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}
</style>
