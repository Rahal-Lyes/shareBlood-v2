import { createRouter, createWebHistory } from "vue-router";

// Import de tes pages (exemple)
import Login from '@/pages/login.vue'
const routes = [
  { path: "/login", component: Login, name: "Login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
