<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Detail SPK Masuk</h5>
        <button class="close" @click="close">×</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="namaKaryawan">Nama Karyawan</label>
            <input
              type="text"
              class="form-control"
              v-model="localItem.nama_karyawan"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="tanggalPengajuan">Tanggal Pengajuan</label>
            <input
              type="text"
              class="form-control"
              v-model="localItem.tanggal_pengajuan"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <select v-model="localItem.status" class="form-control">
              <option value="PENDING">Pending</option>
              <option value="ON_PROCESS">On Process</option>
              <option value="DONE">Done</option>
            </select>
          </div>
          <div class="form-group">
            <label for="namaBarang">Nama Barang</label>
            <input
              type="text"
              class="form-control"
              v-model="localItem.nama_barang"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="quantity">Quantity</label>
            <input
              type="number"
              class="form-control"
              v-model="localItem.quantity"
              disabled
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

const props = defineProps({
  visible: Boolean,
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "updateStatus"]);

const localItem = ref({ ...props.item });

// Sinkronisasi data antara induk dan modal
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

const submitForm = () => {
  emit("updateStatus", { ...localItem.value });
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
