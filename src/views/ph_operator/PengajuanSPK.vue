<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-sm">
      <h2 class="text-center">Pengajuan SPK</h2>
      <form @submit.prevent="submitSPK">
        <!-- ID Karyawan -->
        <div class="mb-3">
          <label for="userId" class="form-label">ID Karyawan</label>
          <input
            type="number"
            class="form-control"
            id="userId"
            v-model="userId"
            required
            placeholder="Masukkan ID Karyawan Anda"
          />
        </div>

        <!-- ID Barang -->
        <div class="mb-3">
          <label for="materialId" class="form-label">ID Barang</label>
          <input
            type="number"
            class="form-control"
            id="materialId"
            v-model="materialId"
            required
            placeholder="Masukkan ID Barang"
          />
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

        <!-- Penerima -->
        <div class="mb-3">
          <label for="operator" class="form-label">Penerima</label>
          <select class="form-select" v-model="penerima" required>
            <option
              v-for="operator in operators"
              :key="operator.userId"
              :value="operator.userId"
            >
              {{ operator.username }}
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
import { useAuthStore } from "@/store/authStore"; 

export default {
  name: "SPKForm",
  data() {
    return {
      userId: null,
      materialId: null,
      quantityOrder: 1,
      tanggal_pengajuan:"",
      penerima: null,
      operators: [], 
    };
  },
  methods: {
    // Ambil data penerima (WH_OPERATOR) dari backend
    async fetchOperators() {
      try {
        const authStore = useAuthStore();
        const token = authStore.token; 
        const response = await axios.get(
          "http://localhost:3000/api/user?role=WH_OPERATOR",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          this.operators = response.data.filter(
            (operator) => operator.role === "WH_OPERATOR"
          );
        } else {
          this.operators = [];
        }

        // Menampilkan data operator yang diterima dari server
        console.log("Data operator yang diterima:", this.operators);
      } catch (error) {
        console.error("Gagal mengambil data operator:", error);
        this.operators = [];
      }
    },

    // Submit data SPK
    async submitSPK() {
      // Validasi input
      if (
        !this.userId ||
        !this.materialId ||
        !this.quantityOrder ||
        !this.penerima
      ) {
        alert("Semua field harus diisi.");
        return;
      }

      const formData = {
        userId: this.userId,
        materialId: this.materialId,
        quantityOrder: this.quantityOrder,
        penerima: this.penerima,
      };

      // Menampilkan data yang dikirim ke server
      console.log("Data yang dikirim:", formData);

      try {
        const authStore = useAuthStore();
        const token = authStore.token || localStorage.getItem("jwt_token"); 

        const response = await axios.post(
          "http://localhost:3000/api/spk",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("SPK berhasil disubmit:", response.data);
        alert("Data berhasil disubmit!");

        // Reset form setelah submit
        this.userId = null;
        this.materialId = null;
        this.quantityOrder = 1;
        this.penerima = null;
      } catch (error) {
        console.error("Gagal mengirim data:", error);
        alert(
          `Gagal mengirim data: ${
            error.response ? error.response.data.message : error.message
          }`
        );
      }
    },
  },
  mounted() {
    // Panggil data operator saat komponen di-mount
    this.fetchOperators();
  },
};
</script>

<style scoped>
.container {
  max-width: 60%;
}

.card {
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}
</style>
