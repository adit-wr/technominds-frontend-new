<template>
  <div>
    <form @submit.prevent="submitForm">
      <table>
        <tbody>
          <tr>
            <td>Kode Barang</td>
            <td>
              <input
                type="text"
                v-model="material.materialId"
                id="materialId"
                :disabled="isEdit"
                required
              />
            </td> 
          </tr>
          <tr>
            <td>Nama Barang</td>
            <td>
              <input type="text" v-model="material.name" id="name" required />
            </td>
          </tr>
          <tr>
            <td>Deskripsi</td>
            <td>
              <input
                type="text"
                v-model="material.descriptions"
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
                v-model="material.quantity"
                id="quantity"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <select v-model="material.status" id="status" required>
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
      material: { ...this.item },  
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(newItem) {
        if (newItem) {
          this.material = { ...newItem };  
        } else {
          this.resetForm();  
        }
      },
    },
  },
  methods: {
    // Reset material ke nilai default
    resetForm() {
      this.material = {
        materialId: "",
        name: "",
        descriptions: "",
        quantity: 0,
        status: "AVAILABLE",
      };
    },
    // Method untuk menangani form submission (tambah/edit data)
    async submitForm() {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        alert("Token tidak valid, silakan login kembali!");
        return;
      }

      try {
        if (this.isEdit) {
          // API untuk update data
          await axios.put(
            `http://localhost:3000/api/materials/${this.material.materialId}`,
            this.material,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Data berhasil diperbarui!");
        } else {
          // API untuk tambah data baru
          await axios.post("http://localhost:3000/api/materials", this.material, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          alert("Data berhasil ditambahkan!");
        }

        // Emit data yang telah disubmit ke parent component
        this.$emit("submit", this.material);
        this.resetForm(); // Reset form setelah submit

        // Panggil fetchMaterials untuk memuat data setelah operasi selesai
        this.fetchMaterials();
      } catch (error) {
        console.error("Terjadi kesalahan saat menyimpan data:", error);
        alert("Gagal menyimpan data. Silakan coba lagi!");
      }
    },

    // Method untuk mengambil data material setelah operasi
    async fetchMaterials() {
      const authStore = useAuthStore();
      if (!authStore.token) {
        console.error("Token kosong! Tidak dapat melakukan permintaan API.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/materials", {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        console.log("Data bahan material:", response.data);
        // Tangani data yang didapatkan, misalnya dengan mengupdate state
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      }
    },
  },
};
</script>

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
