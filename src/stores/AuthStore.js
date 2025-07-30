import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/http";
import router from "@/router/index.js";
import { useToastStore } from "@/stores/ToastStore.js";

export const useAuthStore = defineStore("auth", () => {
  const access = ref(localStorage.getItem("access") || null);
  const refresh = ref(localStorage.getItem("refresh") || null);
  const user = ref(null);

  const isAuthenticated = computed(() => !!access.value);
  const toast = useToastStore();

  // 🟢 Connexion

  async function login(username, password) {
    const response = await api.post("/login/", { username, password });
  
    const {access,refresh,user} =response.data;

    if (!access || !refresh) {
      throw new Error("Réponse du serveur invalide.");
    }

  

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

  return user;
  }

  async function register(username, password,email,first_name,last_name,phone_number,birth_date,blood_type,wilaya,is_donor) {
    try {
      const response = await api.post("/register/", {
      username,password,email,first_name,last_name,phone_number,birth_date,blood_type,wilaya,is_donor
      });

      toast.ToastSuccess({
        message: "Success Register " + response.data.user.username,
        icon: "mdi-check",
      });

      router.push("/login");
      return;
    } catch (err) {
    
      toast.ToastError({
        message: String(
          err.response?.data?.username?.[0] ||
            err.response?.data?.password?.[0] ||
            "Erreur lors de l'inscription"
        ),
        icon: "mdi-alert-circle",
      });
      return err.response;
    }
  }

  // 🔴 Déconnexion
  function logout() {
    access.value = null;
    refresh.value = null;
    user.value = null;

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    router.push("/login");
  }

  return {
    access,
    refresh,
    user,
    isAuthenticated,
    login,
    logout,
    register,
  };
});
