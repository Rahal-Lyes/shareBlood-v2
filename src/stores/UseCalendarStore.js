import { defineStore } from "pinia";
import api from "@/http";
import { useAuthStore } from "@/stores/AuthStore";

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    events: [],
    selectedEvent: {
      user:null,
      title: "",
      start: null,
      end: null,
    },
  }),

  getters: {
    getUserId: (state) => {
      return state.selectedEvent.user;
    },
    getEvents: (state) => state.events,
    isValidSelection: (state) =>
      state.selectedEvent.start &&
      state.selectedEvent.end &&
      state.selectedEvent.title.trim().length > 0,
  },

  actions: {
    setSelection(eventData) {
      this.selectedEvent = {
        user: 1,
        title: eventData.title || "",
        start: eventData.start,
        end: eventData.end,
      };
    },

    resetSelection() {
      this.selectedEvent = {
        user: null,
        title: "",
        start: null,
        end: null,
      };
    },

    async addData() {
      if (!this.isValidSelection) return;
      const newEvent = {
        user: this.selectedEvent.user,
        title: this.selectedEvent.title.trim(),
        start: this.selectedEvent.start,
        end: this.selectedEvent.end,
      };

      try {
        

        const auth = useAuthStore();
      const userId = auth.user?.id;

        const response = await api.post(`/calendar/`, newEvent);

        // Ajouter l'event dans le store local après succès
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

      const response = await api.get(`/calendar/?id=${userId}`);
      this.events = response.data.results;
    },
  },
});
