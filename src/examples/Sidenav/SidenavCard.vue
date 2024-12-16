<script setup>
import { computed } from "vue";
import { useUIStore } from "@/stores/uiStore";
const uiStore = useUIStore();

const isRTL = computed(() => uiStore.isRTL);
const layout = computed(() => uiStore.layout);
defineProps({
  card: {
    type: Object,
    required: true,
    title: String,
    description: String,
    links: {
      type: Array,
      label: String,
      route: String,
      color: String,
    },
  },
});
</script>
<template>
  <div
    v-show="layout !== 'landing'"
    class="card card-plain shadow-none"
    id="sidenavCard"
  >
    <div class="p-3 card-body text-center w-100 pt-0">
      <img
        class="w-50 mx-auto"
        src="@/assets/img/illustrations/icon-documentation.svg"
        alt="sidebar_illustration"
      />

      <h6 v-if="isRTL" class="mb-0 text-dark up">تحتاج مساعدة ؟</h6>

      <h6 v-else class="mb-0 text-dark up">PT.TechnoMinds</h6>

      <p v-if="isRTL" class="text-xs font-weight-bold">
        يرجى التحقق من مستنداتنا
      </p>

      <p v-else class="text-xs font-weight-bold">Material Supply</p>
    </div>
  </div>
</template>
