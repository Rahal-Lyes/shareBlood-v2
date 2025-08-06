import { defineStore } from "pinia";
import instance from "@/http/index.js";
import API_ENDPOINTS from "@/config/endpoints.js";
import { useToastStore } from  "@/stores/ToastStore";

export const useDataStore = (tableId) =>
  defineStore(`data/${tableId}`, {
    state: () => ({
      endpoint: tableId,
      data: [],
      data_count: 0,
      data_headers: [],
      filters: {},
      permissions: {},
      modelVerboseName: "",
      itemsPerPage: 20,
    }),

    getters: {
      GetData: (state) => {
        if (state["data"].length === 0) return [];
        return state["data"];
      },

      GetDataByID: (state) => {
        return (dataID) => {
          if (state["data"].length === 0) return {};
          return state["data"].find((dataPiece) => dataPiece["id"] === dataID);
        };
      },
    },

    actions: {
      SetData(payload) {
        this.data = payload.results;
        this.data_count = payload.count;
      },
      setEndpoint(payload) {
        this.endpoint = payload;
      },
      SetDataByID(id, payload) {
        const index = this.data.findIndex(
          (dataPiece) => dataPiece["id"] === id
        );
        this.data[index] = payload;
      },

    async GetDataFromAPI(search = "", parameters = null, filters_values = {}) {
      try {
        const params = new URLSearchParams();

        // Configuration de base
        params.append("limit", this.itemsPerPage || 20);
        if (search) params.append("search", search);

        // Gestion de la pagination et du tri
        if (parameters) {
          if (parameters.page && parameters.page > 1) {
            params.append("page", parameters.page);
          }

          if (parameters.sortBy && parameters.sortBy.length > 0) {
            const sortKey = parameters.sortBy[0].key;
            const sortOrder = parameters.sortBy[0].order;
            params.append(
              "ordering",
              sortOrder === "asc" ? sortKey : `-${sortKey}`
            );
          }
        }

        // Application des filtres
        const appliedFilters = { ...this.filters, ...filters_values };
        for (const [key, value] of Object.entries(appliedFilters)) {
          if (value !== null && value !== undefined && value !== "") {
            if (Array.isArray(value)) {
              value.forEach((v) => params.append(key, v));
            } else {
              params.append(key, value);
            }
          }
        }

        // Appel API
        const response = await instance.get(API_ENDPOINTS[this.endpoint], {
          params,
        });

        // Mise à jour du store
        this.SetData(response.data);
        return response.data;
      } catch (error) {
        const toastStore = useToastStore();
        const errorMessage =
          error.response?.data?.detail ||
          "Erreur lors de la récupération des données";

        toastStore.ToastWarning({ message: errorMessage });

        throw error;
      }
    },
      async fetchDataHeaders() {
        try {
          const response = await instance.get(`/preferences/${this.endpoint}`);
          
          // Mise à jour des data_headers
          this.data_headers = response.data.headers;
          
          // Optionnel: Sauvegarde dans le state
          return response.data;
          
        } catch (error) {
          const toastStore = useToastStore();
          const errorMessage = error.response?.data?.detail || 
                              "Erreur lors de la récupération des en-têtes";
          
          toastStore.ToastWarning({ message: errorMessage });
          throw error;
        }
      },
    },
  });
