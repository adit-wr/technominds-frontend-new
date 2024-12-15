<template>
  <div>

    <router-view></router-view> 
    
    <!-- Daftar fitur khusus untuk WH Operator -->
    <ul>
      <div v-if="currentComponent === 'tables'">
      <div class="component-container">
        <Tables />
      </div>
    </div>

    
      <div v-if="currentComponent === 'spk-masuk'">
      <div class="component-container">
        <SPKMasuk />
      </div>
        </div>

      
      <div v-if="currentComponent === 'riwayat-spk'">
      <div class="component-container">
        <RiwayatSPK />
      </div>
    </div>

      
      <div v-if="currentComponent === 'profile'">
      <div class="component-container">
        <Profile />
      </div>
    </div>

    </ul>
  </div>
</template>

<script setup>
import Tables from "./Tables.vue";
import SPKMasuk from "./SPKMasuk.vue";
import RiwayatSPK from "./RiwayatSPK.vue";
import Profile from "./Profile.vue";


</script>

<style scoped>
/* Style spesifik untuk WH Operator Dashboard */
h1 {
  color: #4caf50;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>
