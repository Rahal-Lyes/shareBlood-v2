import { createRouter, createWebHistory } from "vue-router";

// Import de tes pages (exemple)
import Login from "@/pages-components/login.vue";
import Dashboard from "@/pages-components/Dashboard.vue";
import Profil from "@/pages-components/components/Profile.vue";
import { components } from "vuetify/dist/vuetify.js";
const routes = [
  { path: "/login", component: Login, name: "Login" },
  {
    path: "/about",
    component: () => import("@/views/About.vue"),
    name: "About",
  },
    {
    path: "/contact",
    component: () => import("@/views/Contact.vue"),
    name: "Contact",
  },

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
  },
  {
    path: "/patient",
    component: () => import("@/views/profile/Patient.vue"),
    name: "Patient",
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "profile",
        component: () => import("@/views/profile/Profile.vue"),
        name: "Profile",
      },
        {
        path: "appointment",
        component: () => import("@/views/profile/Appointment.vue"),
        name: "Appointment",
      },
      
    ],
  },
  {
    path: "/settings",
    component: () => import("@/views/Settings.vue"),
    name: "Settings",
    meta: {
      requiresAuth: true,
    },

    children: [
      {
        path: "profil",
        component: () => import("@/pages-components/components/Profile.vue"),
        name: "Profil",
      },
    ],
  },
  {
    path:"/ecommerce",
    component:()=>import('@/views/ecommerce/Index.vue'),
    name:"Ecommerce",
    meta: {
      requiresAuth: true,
    },
    children:[
        {
        path: "products",
        component: () => import("@/views/ecommerce/Products.vue"),
        name: "Products",
      },
        {
        path: "home",
        component: () => import("@/views/ecommerce/Home.vue"),
        name: "Home",
      },
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
