import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ArgonDashboard from "./argon-dashboard";
import { createPinia } from 'pinia';

const appInstance = createApp(App);

appInstance.use(createPinia()); // Pinia sudah diinstal di sini
appInstance.use(router);
appInstance.use(ArgonDashboard);

appInstance.mount("#app");
