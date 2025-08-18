import { defineStore } from "pinia";
import api from "@/http";
import { useAuthStore } from "@/stores/AuthStore";
import { useToastStore } from "@/stores/ToastStore.js";

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    events: [],
    selectedEvent: {
      id: null, // ✅ ajouté pour éviter les erreurs dans deleteEvent
      user: null,
      name: "",
      phone_number:"",
      start: null,
      end: null,
    },
  }),

  getters: {
    getUserId: (state) => state.selectedEvent.user,
    getEvents: (state) => state.events,
    isValidSelection: (state) =>
      !!state.selectedEvent.start &&
      !!state.selectedEvent.end &&
      state.selectedEvent.name.trim().length > 0,
  },

  actions: {
    setSelection(eventData) {
      console.log("setEvent",eventData)
      const auth = useAuthStore();
      this.selectedEvent = {
        id: eventData.id || null,
        user: auth.user?.id || null,
        name: eventData.title || "",
        phone_number:eventData.phone_number,
        start: eventData.start,
        end: eventData.end,
      };
    },

    resetSelection() {
      this.selectedEvent = {
        id: null,
        user: null,
        name: "",
        phone_number:"",
        start: null,
        end: null,
        isSelected:false
      };
    },

    async addData() {
      if (!this.isValidSelection) return;

      const auth = useAuthStore();
      const toast = useToastStore();
      if (!auth.user?.id) {
        console.error("Utilisateur non connecté, impossible d'ajouter un événement.");
        return;
      }

      const newEvent = {
        user: auth.user.id,
        name: this.selectedEvent.name.trim(),
        phone_number:this.selectedEvent.phone_number.trim(),
        start: this.selectedEvent.start,
        end: this.selectedEvent.end,
        isSelected:this.selectedEvent.isSelected
      };

      try {
        const response = await api.post(`/calendar/events/`, newEvent);
        // Ajouter l'événement dans le store local après succès
        this.events.push(response.data);

        this.resetSelection();
          toast.ToastSuccess({
        message: "Appointment added successfully:" ,
        icon: "mdi-check",
      });
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'événement :", error);
        toast.ToastError({
          message: error.response.data.error,
          icon: "mdi-alert-circle",
        });
      }
    },

    deleteEvent(eventId) {
      this.events = this.events.filter((event) => event.id !== eventId);
      if (this.selectedEvent.id === eventId) {
        this.resetSelection();
      }
    },

    async fetchData() {
    

      try {
        const response = await api.get(`/calendar/events/`);
        console.log("response",response);
        this.events = response.data.results || [];
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
      }
    },
  },
});
