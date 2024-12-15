<template>
    <div class="item-list-container">
        <div class="card modern-card">
            <div class="card-header">
                <h2 class="card-title">Master Data Inventory</h2>
                <button @click="showAddForm" class="btn btn-primary add-item-btn">
                    <i class="bi bi-plus-circle me-2"></i>Tambah Item
                </button>
            </div>
            <div class="table-responsive">
                <table class="table modern-table">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Deskripsi</th>
                            <th>Stok</th>
                            <th>Harga</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td>
                                <div class="item-name">{{ item.name }}</div>
                            </td>
                            <td>
                                <div class="item-description text-muted">{{ item.deskripsi }}</div>
                            </td>
                            <td>
                                <span 
                                    class="badge" 
                                    :class="{
                                        'bg-success': item.stok > 200,
                                        'bg-warning': item.stok <= 200 && item.stok > 50,
                                        'bg-danger': item.stok <= 50
                                    }"
                                >
                                    {{ item.stok }}
                                </span>
                            </td>
                            <td>
                                <div class="item-price text-primary fw-bold">{{ item.price }}</div>
                            </td>
                            <td class="text-center">
                                <div class="btn-group" role="group">
                                    <button 
                                        @click="editItem(item)" 
                                        class="btn btn-outline-warning btn-sm me-2"
                                    >
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button 
                                        @click="deleteItem(item.id)" 
                                        class="btn btn-outline-danger btn-sm"
                                    >
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Modal :visible="showForm" @close="cancelEditForm">
            <ItemForm
                :item="selectedItem"
                :isEdit="isEdit"
                @submit="handleSubmit"
                @cancel="cancelEditForm"
            />
        </Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                { id: 1, name: 'Benang Poliéster', deskripsi: 'Benang berkualitas tinggi untuk menjahit', stok: 500, price: 'Rp 100.000' },
                { id: 2, name: 'Kain Katun', deskripsi: 'Kain katun untuk pembuatan pakaian', stok: 200, price: 'Rp 250.000' },
                { id: 3, name: 'Kain Spandex', deskripsi: 'Kain elastis untuk pakaian olahraga', stok: 150, price: 'Rp 300.000' },
                { id: 4, name: 'Kain Satin', deskripsi: 'Kain satin untuk busana formal', stok: 100, price: 'Rp 500.000' },
                { id: 5, name: 'Dye (Pewarna)', deskripsi: 'Pewarna tekstil untuk memberikan warna pada kain', stok: 300, price: 'Rp 50.000' },
                { id: 6, name: 'Bahan Pelapis', deskripsi: 'Bahan untuk pelapisan kain', stok: 250, price: 'Rp 200.000' },
                { id: 7, name: 'Furnitur Mesin Jahit', deskripsi: 'Peralatan untuk memproduksi pakaian', stok: 20, price: 'Rp 15.000.000' },
                { id: 8, name: 'Pita Pengukur', deskripsi: 'Alat untuk mengukur ukuran kain', stok: 50, price: 'Rp 15.000' },
            ],
            showForm: false,
            selectedItem: null,
            isEdit: false
        };
    },
    methods: {
        showAddForm() {
            this.selectedItem = { id: "", name: "", deskripsi: "", stok: "", price: "" };
            this.isEdit = false;
            this.showForm = true;
        },
        editItem(item) {
            this.selectedItem = { ...item };
            this.isEdit = true;
            this.showForm = true;
        },
        handleSubmit(item) {
            if (this.isEdit) {
                const index = this.items.findIndex((i) => i.id === item.id);
                if (index !== -1) {
                    this.items.splice(index, 1, item);
                }
            } else {
                item.id = Date.now(); 
                this.items.push(item);
            }
            this.showForm = false;
            this.selectedItem = null;
            this.isEdit = false;
        },
        cancelEditForm() {
            this.showForm = false;
            this.isEdit = false;
            this.selectedItem = null;
        },
        deleteItem(id) {
            // Add confirmation dialog
            if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
                this.items = this.items.filter(item => item.id !== id);
            }
        }
    }
};
</script>

<style scoped>
.item-list-container {
    background-color: #f4f7fa;
    padding: 20px;
}

.modern-card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: none;
    overflow: hidden;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
}

.card-title {
    margin-bottom: 0;
    font-weight: 600;
    color: #333;
}

.add-item-btn {
    display: flex;
    align-items: center;
    gap: 8px;
}

.modern-table {
    margin-bottom: 0;
}

.modern-table thead {
    background-color: #f1f3f5;
}

.modern-table thead th {
    color: #495057;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #dee2e6;
}

.modern-table tbody tr {
    transition: background-color 0.2s ease;
}

.modern-table tbody tr:hover {
    background-color: rgba(0, 123, 255, 0.05);
}

.item-name {
    font-weight: 600;
    color: #212529;
    padding: 5px;
}

.item-description {
    font-size: 0.9em;
    color: #6c757d;
}

.item-price {
    color: #28a745;
    font-weight: 600;
}

.badge {
    padding: 0.4em 0.6em;
    border-radius: 4px;
    font-weight: 500;
}

.btn-group .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    padding: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-header {
        flex-direction: column;
        gap: 15px;
    }

    .add-item-btn {
        width: 100%;
        justify-content: center;
    }
}
</style>