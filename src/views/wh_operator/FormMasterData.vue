<template>
  <div>
    <form @submit.prevent="submitForm">
      <h2>{{ formTitle }}</h2>
      <table>
        <tbody>
          <tr>
            <td>Kode Barang</td>
            <td>
              <input
                type="text"
                v-model="form.materialId"
                id="materialId"
                :disabled="isEdit"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Nama Barang</td>
            <td>
              <input type="text" v-model="form.name" id="name" required />
            </td>
          </tr>
          <tr>
            <td>Deskripsi</td>
            <td>
              <input
                type="text"
                v-model="form.descriptions"
                id="descriptions"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Stok</td>
            <td>
              <input
                type="number"
                v-model="form.quantity"
                id="quantity"
                min="0"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <select v-model="form.status" id="status" required>
                <option value="AVAILABLE">Available</option>
                <option value="UNAVAILABLE">Unavailable</option>
              </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div class="button-group">
                <button type="submit">
                  {{ isEdit ? "Simpan Perubahan" : "Tambah Barang" }}
                </button>
                <button type="button" class="cancel" @click="$emit('cancel')">
                  Batal
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export default {
  name: "ItemForm",
  props: {
    item: {
      type: Object,
      default: () => ({
        materialId: "",
        name: "",
        descriptions: "",
        quantity: 0,
        status: "AVAILABLE",
      }),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        materialId: "",
        name: "",
        descriptions: "",
        quantity: 0,
        status: "AVAILABLE",
      },
    };
  },
  watch: {
    // Mengisi form ketika `item` berubah
    item: {
      immediate: true,
      handler(newItem) {
        if (newItem && newItem.materialId) {
          this.form = { ...newItem };
        } else {
          this.resetForm();
        }
      },
    },
  },
  computed: {
    formTitle() {
      return this.isEdit ? "Edit Barang" : "Tambah Barang";
    },
  },
  methods: {
    resetForm() {
      this.form = {
        materialId: "",
        name: "",
        descriptions: "",
        quantity: 0,
        status: "AVAILABLE",
      };
    },
    async submitForm() {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        alert("Token tidak valid, silakan login kembali!");
        return;
      }

      try {
        if (this.isEdit) {
          // PUT request untuk edit data
          await axios.put(
            `http://localhost:3000/api/materials/${this.form.materialId}`, 
            this.form,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert("Data berhasil diperbarui!");
        } else {
          // POST request untuk tambah data baru
          await axios.post("http://localhost:3000/api/materials", this.form, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert("Data berhasil ditambahkan!");
        }

        // Emit event submit ke parent
        this.$emit("submit", this.form);
        this.resetForm();
      } catch (error) {
        console.error("Gagal menyimpan data:", error);
        alert(
          error.response?.data?.message ||
            "Terjadi kesalahan, silakan coba lagi!"
        );
      }
    },
  },
};
</script>

<style scoped>
/* Tambahkan CSS sesuai kebutuhan */
</style>

<style scoped>
table {
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
}

td {
  padding: 10px;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input:disabled {
  background-color: #f5f5f5;
}

button {
  padding: 8px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #4338ca;
}

.button-group {
  display: flex;
  gap: 1rem;
}

.cancel {
  background-color: #dc2626;
}

.cancel:hover {
  background-color: #b91c1c;
}
</style>
