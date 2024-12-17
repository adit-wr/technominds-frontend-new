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
                v-model="form.code"
                materialId="code"
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
                required
              />
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <div class="form-group">
              <label for="status">Status</label>
              <select v-model="localItem.status" class="form-control">
                <option value="AVAILABLE">Available</option>
                <option value="UNAVAILABLE">Unavailable</option>
              </select>
            </div>
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
export default {
  name: "ItemForm",
  props: {
    item: {
      type: Object,
      default: () => ({
        code: "",
        name: "",
        descriptions: "",
        quantity: 0,
        status: "",
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
        code: "",
        name: "",
        descriptions: "",
        quantity: 0,
        status: "",
      },
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(newItem) {
        if (newItem) {
          this.form = {
            code: newItem.materialId || "",
            name: newItem.name || "",
            descriptions: newItem.descriptions || "",
            quantity: newItem.quantity || "0",
            status: newItem.status || "",
          };
        } else {
          this.form = {
            code: "",
            name: "",
            descriptions: "",
            quantity: 0,
            status: "",
          };
        }
      },
    },
  },
  methods: {
    submitForm() {
      if (this.form.quantity < 0) {
        alert("Stok tidak boleh negatif");
        return;
      }

      this.$emit("submit", { ...this.form });
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

input {
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
