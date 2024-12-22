<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-sm">
      <h2 class="text-center">Pengajuan SPK</h2>
      <form @submit.prevent="submitSPK">
        <!-- Nama Karyawan -->
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
          <small v-if="employeeName">Nama Karyawan: {{ username }}</small>
        </div>

        <!-- Nama Barang -->
        <div class="mb-3">
          <label for="materialId" class="form-label">Nama Barang</label>
          <select
            class="form-select"
            id="materialId"
            v-model="materialId"
            required
          >
            <option v-for="material in materials" :key="material.id" :value="material.id">
              {{ material.name }}
            </option>
          </select>
        </div>

        <!-- Jumlah Barang -->
        <div class="mb-3">
          <label for="quantityOrder" class="form-label">Jumlah Barang</label>
          <input
            type="number"
            class="form-control"
            id="quantityOrder"
            v-model="quantityOrder"
            required
            min="1"
          />
        </div>

        <!-- Tanggal Pengajuan -->
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

        <!-- Penerima -->
        <div class="mb-3">
          <label for="operator" class="form-label">Penerima</label>
          <select class="form-select" v-model="penerima" required>
            <option
              v-for="operator in user"
              :key="operator.userId"
              :value="operator.userId"
            >
              {{ operator.name }}
            </option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">Kirim</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SPKForm",
  data() {
    return {
      userId: "", 
      materialId: "", 
      quantityOrder: 1, 
      submissionDate: "", 
      penerima: "", 
      employeeName: "", 
      operators: [], 
      materials: [], 
    };
  },
  methods: {
    // Ambil nama karyawan berdasarkan userId
    async fetchEmployeeName() {
      if (this.userId) {
        try {
          const token = localStorage.getItem("jwt_token");
          const response = await axios.get(`http://localhost:3000/api/user/${this.userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.employeeName = response.data.name || "Tidak ditemukan";
        } catch (error) {
          console.error("Gagal mengambil data karyawan:", error);
          this.employeeName = "";
        }
      }
    },

    // Ambil data penerima (WH_OPERATOR) dari backend
    async fetchOperators() {
      try {
        const token = localStorage.getItem("jwt_token");
        const response = await axios.get("http://localhost:3000/api/user?role=WH_OPERATOR", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.operators = response.data; 
      } catch (error) {
        console.error("Gagal mengambil data operator:", error);
        this.operators = [];
      }
    },

    // Ambil data barang dari backend
    async fetchMaterials() {
      try {
        const token = localStorage.getItem("jwt_token");
        const response = await axios.get("http://localhost:3000/api/materials", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.materials = response.data; 
      } catch (error) {
        console.error("Gagal mengambil data barang:", error);
        this.materials = [];
      }
    },

    // Submit data SPK
    async submitSPK() {
      const formData = {
        userId: this.userId,
        materialId: this.materialId,
        quantityOrder: this.quantityOrder,
        submissionDate: this.submissionDate,
        penerima: this.penerima,
      };

      try {
        const token = localStorage.getItem("jwt_token");
        const response = await axios.post("http://localhost:3000/api/spk", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("SPK berhasil disubmit:", response.data);
        alert("Data berhasil disubmit!");

        // Reset form setelah submit
        this.userId = "";
        this.materialId = "";
        this.quantityOrder = 1;
        this.submissionDate = "";
        this.penerima = "";
        this.employeeName = "";
      } catch (error) {
        console.error("Gagal mengirim data:", error);
        alert("Gagal mengirim data.");
      }
    },
  },
  mounted() {
    // Panggil data operator dan material saat komponen di-mount
    this.fetchOperators();
    this.fetchMaterials();
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
