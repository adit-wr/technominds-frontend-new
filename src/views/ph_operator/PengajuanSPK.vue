<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-sm">
      <h2 class="text-center">Pengajuan SPK</h2>
      <form @submit.prevent="submitSPK">
        <div class="mb-3">
          <label for="employeeName" class="form-label">Nama Karyawan</label>
          <input
            type="text"
            class="form-control"
            id="employeeName"
            v-model="employeeName"
            required
          />
        </div>
        <div class="mb-3">
          <label for="spkFile" class="form-label">Upload SPK</label>
          <input
            type="file"
            class="form-control"
            id="spkFile"
            @change="handleFileUpload"
            required
          />
        </div>
        <div class="mb-3">
          <label for="submissionDate" class="form-label">Tanggal</label>
          <input
            type="date"
            class="form-control"
            id="submissionDate"
            v-model="submissionDate"
            required
          />
        </div>

        <div class="mb-3">
          <label for="operator" class="form-label">Penerima</label>
          <select class="form-select" v-model="selectedOperator" required>
            <option v-for="operator in operators" :key="operator.name" :value="operator.name">
              {{ operator.name }} || {{ operator.status }}
            </option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">Kirim</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SPKForm",
  data() {
    return {
      employeeName: "",
      spkFile: null,
      submissionDate: "",
      selectedOperator: "",
      operators: [
        { name: "Doni Monardo", status: "Free" },
        { name: "Imelda Kartiwa", status: "Off" },
        { name: "Intal Amelia", status: "On Duty" },
        { name: "Jefri Ananda", status: "Off" },
      ],
    };
  },
  methods: {
    handleFileUpload(event) {
      this.spkFile = event.target.files[0];
    },
    submitSPK() {
      const formData = new FormData();
      formData.append("employeeName", this.employeeName);
      formData.append("spkFile", this.spkFile);
      formData.append("submissionDate", this.submissionDate);
      formData.append("selectedOperator", this.selectedOperator);

      // Send the form data to the server
      // Example: axios.post('your/api/endpoint', formData)
      console.log("Form submitted", {
        employeeName: this.employeeName,
        submissionDate: this.submissionDate,
        spkFile: this.spkFile,
        selectedOperator: this.selectedOperator,
      });

      // Reset form fields after submission
      this.employeeName = "";
      this.spkFile = null;
      this.submissionDate = "";
      this.selectedOperator = "";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}

.card {
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}
</style>
