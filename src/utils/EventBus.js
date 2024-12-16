// src/utils/EventBus.js
import { reactive } from 'vue';

const EventBus = reactive({
  on(event, callback) {
    document.addEventListener(event, callback);
  },
  off(event, callback) {
    document.removeEventListener(event, callback);
  },
  emit(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
});

export default EventBus;
