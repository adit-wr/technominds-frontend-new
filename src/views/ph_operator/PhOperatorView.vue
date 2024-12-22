<template>
  <div>
    <router-view></router-view>
    
    <!-- Daftar fitur khusus untuk PH Operator -->
    <ul>
      
      <div v-if="currentComponent === 'master-data'">
        <div class="component-container">
          <MasterData />
        </div>
      </div>

      <div v-if="currentComponent === 'user-data'">
        <div class="component-container">
          <UserData />
        </div>
      </div>
      
      <div v-if="currentComponent === 'Pengajuan-spk'">
        <div class="component-container">
          <PengajuanSPK />
        </div>
      </div>
      
      <div v-if="currentComponent === 'riwayat-spk'">
        <div class="component-container">
          <RiwayatSPKPH />
        </div>
      </div>
    </ul>
  </div>
</template>

<script setup>
import MasterData from "./MasterData.vue";
import UserData from "./UserData.vue"
import PengajuanSPK from "./PengajuanSPK.vue";
import RiwayatSPKPH from "./RiwayatSPKPH.vue";


</script>

<style scoped>
/* Style spesifik untuk PH Operator Dashboard */
h1 {
  color: #f44336;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>


