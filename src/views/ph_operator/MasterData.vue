<template>
  <div class="item-list-container">
    <div class="card modern-card">
      <div class="card-header">
        <h2 class="card-title">Master Data Inventory</h2>
      </div>
      <div class="table-responsive">
        <table class="table modern-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Stok</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.materialId">
              <td>
                <div class="item-name">{{ item.name }}</div>
              </td>
              <td>
                <div class="item-description text-muted">
                  {{ item.descriptions }}
                </div>
              </td>
              <td>
                <span
                  class="badge"
                  :class="{
                    'bg-success': item.quantity > 200,
                    'bg-warning': item.quantity <= 200 && item.stok > 50,
                    'bg-danger': item.quantity <= 50,
                  }"
                >
                  {{ item.quantity }}
                </span>
              </td>
              <td>
                <div class="item-price text-primary fw-bold">
                  {{ item.status }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          materialId: 1,
          name: "Benang Poliéster",
          descriptions: "Benang berkualitas tinggi untuk menjahit",
          quantity: 500,
          status: "UNVAILABLE",
        },
      ],
    };
  },
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