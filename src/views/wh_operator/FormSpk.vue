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
              v-model="localItem.namaKaryawan"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="spk">Surat Perintah Kerja (SPK)</label><br>
            <a :href="localItem.spk" target="_blank" class="btn btn-link"><i class="bi bi-download"></i> Download PDF</a>
          </div>
          <div class="form-group">
            <label for="tanggalPengajuan">Tanggal Pengajuan</label>
            <input
              type="text"
              class="form-control"
              v-model="localItem.tanggalPengajuan"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <select v-model="localItem.status" class="form-control">
              <option value="Pending">Pending</option>
              <option value="On Process">On Process</option>
              <option value="Done">Done</option>
            </select>
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
