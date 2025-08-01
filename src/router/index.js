import { createRouter, createWebHistory } from "vue-router";

// Import de tes pages (exemple)
import Login from "@/pages-components/login.vue";
import Dashboard from "@/pages-components/Dashboard.vue";
import { components } from "vuetify/dist/vuetify.js";
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
     meta: {
      requiresAuth: true,
    },
  },  {
  path: '/patient',
  component: () => import('@/views/Patient.vue'),
  name: 'Patient',
   meta: {
      requiresAuth: true,
    },
  children: [
    {
      path: 'profile',
      component: () => import('@/views/Profile.vue'),
      name: 'Profile'
    },
    {
      path:'/accounts/:id',
      component:()=>import('@/components/AccountDetails.vue'),
      name:'AccountDetails'
    }
  ]
}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("access");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});


export default router;
