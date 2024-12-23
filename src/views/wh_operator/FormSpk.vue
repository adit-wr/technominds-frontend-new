<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Detail SPK Masuk</h5>
        <button class="close" @click="close">×</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitForm">
          <!-- Nama Karyawan (Disabled) -->
          <div class="form-group">
            <label for="namaKaryawan">Nama Karyawan</label>
            <input
              type="text"
              class="form-control"
              v-model="localItem.nama_karyawan"
              placeholder="Masukkan nama karyawan"
              :disabled="true"
            />
          </div>

          <!-- Tanggal Pengajuan (Disabled) -->
          <div class="form-group">
            <label for="tanggal_pengajuan">Tanggal Pengajuan</label>
            <input
              type="text"
              class="form-control"
              v-model="localItem.tanggal_pengajuan"
              :disabled="true"
            />
          </div>

          <!-- Status (Editable) -->
          <div class="form-group">
            <label for="status">Status</label>
            <select v-model="localItem.status" class="form-control">
              <option value="PENDING">Pending</option>
              <option value="ON_PROCESS">On Process</option>
              <option value="DONE">Done</option>
            </select>
          </div>

          <!-- Nama Barang (Disabled) -->
          <div class="form-group">
            <label for="namaBarang">Nama Barang</label>
            <input
              type="text"
              class="form-control"
              v-model="localItem.nama_barang"
              placeholder="Masukkan nama barang"
              :disabled="true"
            />
          </div>

          <!-- Quantity (Disabled) -->
          <div class="form-group">
            <label for="quantity">Quantity</label>
            <input
              type="number"
              class="form-control"
              v-model="localItem.quantityOrder"
              placeholder="Masukkan jumlah"
              min="1"
              :disabled="true"
            />
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">
              Batal
            </button>
            <button type="submit" class="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios"; // Pastikan Anda sudah menginstal axios
import { useAuthStore } from "@/store/authStore"; // Sesuaikan dengan path store Auth Anda

const props = defineProps({
  visible: Boolean,
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "updateStatus"]);

const localItem = ref({ ...props.item });

watch(
  () => props.item,
  (newItem) => {
    localItem.value = { ...newItem };
  },
  { deep: true }
);

const close = () => {
  emit("close");
};

const submitForm = async () => {
  try {
    const authStore = useAuthStore(); 
    const response = await axios.patch(
      `http://localhost:3000/api/spk/${localItem.value.spkId}`,
      {
        status: localItem.value.status,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`, 
        },
      }
    );

    // Jika request sukses, beri respons dan tutup modal
    if (response.status === 200) {
      emit("updateStatus", { ...localItem.value });
      close(); 
    }
  } catch (error) {
    console.error("Error updating status:", error);
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
