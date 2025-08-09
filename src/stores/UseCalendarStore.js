import { defineStore } from "pinia";
import api from "@/http";
import { useAuthStore } from "@/stores/AuthStore";

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    events: [],
    selectedEvent: {
      id: null, // ✅ ajouté pour éviter les erreurs dans deleteEvent
      user: null,
      title: "",
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
      state.selectedEvent.title.trim().length > 0,
  },

  actions: {
    setSelection(eventData) {
      const auth = useAuthStore();
      this.selectedEvent = {
        id: eventData.id || null,
        user: auth.user?.id || null,
        title: eventData.title || "",
        start: eventData.start,
        end: eventData.end,
      };
    },

    resetSelection() {
      this.selectedEvent = {
        id: null,
        user: null,
        title: "",
        start: null,
        end: null,
      };
    },

    async addData() {
      if (!this.isValidSelection) return;

      const auth = useAuthStore();
      if (!auth.user?.id) {
        console.error("Utilisateur non connecté, impossible d'ajouter un événement.");
        return;
      }

      const newEvent = {
        user: auth.user.id,
        title: this.selectedEvent.title.trim(),
        start: this.selectedEvent.start,
        end: this.selectedEvent.end,
      };

      try {
        const response = await api.post(`/calendar/`, newEvent);

        // Ajouter l'événement dans le store local après succès
        this.events.push(response.data);

        this.resetSelection();
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'événement :", error);
      }
    },

    deleteEvent(eventId) {
      this.events = this.events.filter((event) => event.id !== eventId);
      if (this.selectedEvent.id === eventId) {
        this.resetSelection();
      }
    },

    async fetchData() {
      const auth = useAuthStore();
      const userId = auth.user?.id;

      if (!userId) {
        console.warn("Aucun utilisateur connecté, fetchData annulé.");
        return;
      }

      try {
        const response = await api.get(`/calendar/?id=${userId}`);
        this.events = response.data.results || [];
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
      }
    },
  },
});
