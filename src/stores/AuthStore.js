import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/http";
import router from "@/router/index.js";
import { useToastStore } from "@/stores/ToastStore.js";

export const useAuthStore = defineStore("auth", () => {
  const access = ref(localStorage.getItem("access") || null);
  const refresh = ref(localStorage.getItem("refresh") || null);
  const user = ref(JSON.parse(localStorage.getItem("user")));

  const isAuthenticated = computed(() => !!access.value);
  const toast = useToastStore();

const getUser = computed(() => user.value?.id || null);
  // 🟢 Connexion

  async function login(username, password) {
    const response = await api.post("/login/", { username, password });

    const { access, refresh, user } = response.data;

    if (!access || !refresh) {
      throw new Error("Réponse du serveur invalide.");
    }

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  }

  async function register(
    username,
    password,
    email,
    first_name,
    last_name,
    phone_number,
    birth_date,
    blood_type,
    wilaya,
    is_donor
  ) {
    try {
      const response = await api.post("/register/", {
        username,
        password,
        email,
        first_name,
        last_name,
        phone_number,
        birth_date,
        blood_type,
        wilaya,
        is_donor,
      });

      toast.ToastSuccess({
        message: "Success Register " + response.data.user.username,
        icon: "mdi-check",
      });

      router.push("/login");
      return;
    } catch (err) {
      const errors = err.response?.data;
      if (errors && typeof errors === "object") {
        Object.entries(errors).forEach(([field, messages]) => {
          messages.forEach((msg) => {
            toast.ToastError({
              message: `${field}: ${msg}`,
              icon: "mdi-alert-circle",
            });
          });
        });
      } else {
        toast.ToastError({
          message: "Erreur inconnue lors de l'inscription",
          icon: "mdi-alert-circle",
        });
      }
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
    localStorage.removeItem("user");
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
