<template>
  <div>
    <form @submit.prevent="submitForm">
      <h2>{{ formTitle }}</h2>
      <table>
        <tbody>
          <tr>
            <td>ID</td>
            <td>
              <input
                type="text"
                v-model="form.userId"
                id="userId"
                :disabled="isEdit"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Username</td>
            <td>
              <input
                type="text"
                v-model="form.username"
                id="username"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <input type="email" v-model="form.email" id="email" required />
            </td>
          </tr>
          <tr>
            <td>Role</td>
            <td>
              <input
                type="number"
                v-model="form.role"
                id="role"
                min="0"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <select v-model="form.status" id="status" required>
                <option value="FREE">FREE</option>
                <option value="OFF">OFF</option>
                <option value="ON_DUTY">ON DUTY</option>
              </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div class="button-group">
                <button type="submit">
                  {{ isEdit ? "Simpan Perubahan" : "Edit User" }}
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
  name: "FormUserData", 
  props: {
    item: {
      type: Object,
      default: () => ({
        userId: "",
        username: "",
        email: "",
        role: "",
        status: "FREE",
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
        userId: "",
        username: "",
        email: "",
        role: "",
        status: "FREE",
      },
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(newItem) {
        if (newItem && newItem.userId) {
          this.form = { ...newItem };
        } else {
          this.resetForm();
        }
      },
    },
  },
  computed: {
    formTitle() {
      return this.isEdit ? "Edit User" : "Tambah User"; 
    },
  },
  methods: {
    resetForm() {
      this.form = {
        userId: "",
        username: "",
        email: "",
        role: "",
        status: "FREE",
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
            `http://localhost:3000/api/user/${this.form.userId}`, 
            this.form,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert("Data berhasil diperbarui!");
        } else {
          // Jika ingin menangani tambahan user, bisa tambahkan request POST di sini
          alert("Fitur untuk menambah user belum diimplementasikan.");
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
