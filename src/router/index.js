import { createRouter, createWebHistory } from "vue-router";

// Import de tes pages (exemple)
import Login from "@/pages-components/login.vue";
import Dashboard from "@/pages-components/Dashboard.vue";
const routes = [
  { path: "/login", component: Login, name: "Login" },
  {
    path: "/register",
    component: () => import("@/pages-components/components/Register.vue"),
    name: "Register",
  },
  {
    path: "/",
    component: Dashboard,
    name: "Dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
