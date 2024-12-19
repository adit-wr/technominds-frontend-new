import { defineStore } from "pinia";

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    items: [
      {
        kode: "2024001",
        nama: "Acer Nitro 15 AN515-58",
        deskripsi: "Intel Core i5 12500H, RTX 3050, RAM 8GB DDR4, LAYAR 15.6",
        stok: 80,
      },
      
    ], 
  }),

  getters: {
    getItemByKode: (state) => (kode) =>
      state.items.find((item) => item.kode === kode),
    totalItems: (state) => state.items.length,
    availableItems: (state) => state.items.filter((item) => item.stok > 0),
  },

  actions: {
    addItem(item) {
      const exists = this.items.some((i) => i.code === item.code);
      if (exists) {
        alert("Kode barang sudah ada!");
        return;
      }
      this.items.push(item);
    },

    updateItem(updatedItem) {
      const index = this.items.findIndex(
        (item) => item.kode === updatedItem.kode
      );

      if (index !== -1) {
        this.items[index] = updatedItem;
      }
    },

    deleteItem(itemCode) {
      // Hapus item berdasarkan itemCode
      const index = this.items.findIndex(item => item.code === itemCode);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
  },

  persist: true, 
});
