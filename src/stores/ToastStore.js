import { defineStore } from "pinia";
export const useToastStore = defineStore("toast", {
  //STATE
  state: () => ({
    message: "",
    color: "success",
    timer: 2000,
    icon: "mdi-check",
    show: false,
  }),
  //GETTERS
  getters: {},
  //ACTIONS
  actions: {
    Toast(data) {
      if (!data) return;
      this.message = data.message;
      this.color = data.color;
      this.timer = data.timer;
      this.icon = data.icon;
      this.show = true;
    },
    ToastError(data) {
      this.Toast({
        ...data,
        color: "error",
        icon: "mdi-error",
      });
    },

    ToastWarning(data) {
      this.Toast({
        ...data,
        color: "warning",
        icon: "mdi-error",
      });
    },
    ToastSuccess(data) {
      this.Toast({
        ...data,
        color: "success",
        icon: "mdi-check-circle",  
      });
    },
  },
});
