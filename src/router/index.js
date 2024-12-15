import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue";

// Import the new role-based view components
import WhOperatorView from "../views/wh_operator/WhOperatorView.vue";
import PhOperatorView from "../views/ph_operator/PhOperatorView.vue";

// Helper function to retrieve role from localStorage
const getUserRole = () => {
  return localStorage.getItem("userRole") || "wh_operator";
};

const routes = [
  {
    path: "/",
    redirect: "/signin",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  // Define routes based on user role
  {
    path: "/wh-operator",
    component: WhOperatorView,
    children: [
      { path: "tables", component: () => import("../views/wh_operator/Tables.vue") },
      { path: "spk-masuk", component: () => import("../views/wh_operator/SPKMasuk.vue") },
      { path: "riwayat-spk", component: () => import("../views/wh_operator/RiwayatSPK.vue") },
      { path: "profile", component: () => import("../views/wh_operator/Profile.vue") },
    ],
    beforeEnter: (to, from, next) => {
      if (getUserRole() === "wh_operator") next();
      else next("/signin");
    },
  },
  {
    path: "/ph-operator",
    component: PhOperatorView,
    children: [
      { path: "master-data", component: () => import("../views/ph_operator/MasterData.vue") },
      { path: "pengajuan-spk", component: () => import("../views/ph_operator/PengajuanSPK.vue") },
      { path: "riwayat-spk", component: () => import("../views/ph_operator/RiwayatSPKPH.vue") },
    ],
    beforeEnter: (to, from, next) => {
      if (getUserRole() === "ph_operator") next();
      else next("/signin");
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
