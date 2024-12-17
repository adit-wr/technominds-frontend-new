import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";

// Import the new role-based view components
import WhOperatorView from "../views/wh_operator/WhOperatorView.vue";
import PhOperatorView from "../views/ph_operator/PhOperatorView.vue";

// Helper function to retrieve role from localStorage
const getUserRole = () => {
  return localStorage.getItem("role") || "WH_OPERATOR"; 
};

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  // Define routes based on user role
  {
    path: "/wh-operator",
    component: WhOperatorView,
    children: [
      { path: "tables", component: () => import("../views/wh_operator/Tables.vue") },
      { path: "spk-masuk ", component: () => import("../views/wh_operator/SPKMasuk.vue") },
      { path: "riwayat-spk", component: () => import("../views/wh_operator/RiwayatSPK.vue") },
      { path: "profile", component: () => import("../views/wh_operator/Profile.vue") },
    ],
    beforeEnter: (to, from, next) => {
      if (getUserRole() === "WH_OPERATOR") next();
      else next("/login"); 
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
      if (getUserRole() === "PH_OPERATOR") next();
      else next("/login"); 
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(localStorage.getItem("auth")); 
  const userRole = localStorage.getItem("role"); 

  if (to.meta.requiresAuth && !isAuthenticated) {
    alert("You need to log in to access this page.");
    next({ name: "login" });
  } else if (to.meta.requiresAuth && isAuthenticated && to.meta.role !== userRole) {
    alert("You do not have permission to access this page.");
    next(false); 
  } else {
    next(); 
  }
});

export default router;
