<template>
  <v-container>
    <v-row>
      <!-- Événements par mois -->
      <v-col cols="12" md="6" >
        <v-card class="chart-bg">
          <v-card-title>Événements par mois</v-card-title>
          <v-card-text>
            <canvas id="eventsPerMonth"></canvas>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Événements par utilisateur -->
      <v-col cols="12" md="6">
        <v-card class="chart-bg">
          <v-card-title>Événements par utilisateur</v-card-title>
          <v-card-text>
            <canvas id="eventsPerUser"></canvas>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Taux de réservation -->
      <v-col cols="12" md="6">
        <v-card class="chart-bg">
          <v-card-title>Taux de réservation</v-card-title>
          <v-card-text>
            <canvas id="reservationRate"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { onMounted, onBeforeUnmount } from "vue";
import api from "@/http";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  name: "Dashboard",
  setup() {
    let charts = {}; // garder les instances Chart.js

    // Détruire les anciens graphiques avant d’en recréer
    function destroyChart(id) {
      if (charts[id]) {
        charts[id].destroy();
      }
    }

    async function loadCharts() {
      try {
        // 📊 Événements par mois
        const resMonth = await api.get("calendar/events-per-month/");
        destroyChart("eventsPerMonth");
        charts["eventsPerMonth"] = new Chart(
          document.getElementById("eventsPerMonth"),
          {
            type: "bar",
            data: {
              labels: resMonth.data.labels,
              datasets: [
                {
                  label: "Événements",
                  data: resMonth.data.data,
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
              ],
            },
            options: {
              responsive: true,
              plugins: { legend: { display: false } },
            },
          }
        );

        // 👤 Événements par utilisateur
        const resUser = await api.get("calendar/events-per-user/");
        destroyChart("eventsPerUser");
        charts["eventsPerUser"] = new Chart(
          document.getElementById("eventsPerUser"),
          {
            type: "pie",
            data: {
              labels: resUser.data.labels,
              datasets: [
                {
                  label: "Événements",
                  data: resUser.data.data,
                  backgroundColor: resUser.data.labels.map(
                    (_, i) =>
                      `hsl(${(i * 60) % 360}, 70%, 60%)` // couleurs dynamiques
                  ),
                },
              ],
            },
            options: { responsive: true },
          }
        );

        // 📅 Taux de réservation
        const resRate = await api.get("calendar/reservation-rate/");
        destroyChart("reservationRate");
        charts["reservationRate"] = new Chart(
          document.getElementById("reservationRate"),
          {
            type: "doughnut",
            data: {
              labels: resRate.data.labels,
              datasets: [
                {
                  label: "Réservations",
                  data: resRate.data.data,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                  ],
                },
              ],
            },
            options: { responsive: true },
          }
        );
      } catch (error) {
        console.error("Erreur lors du chargement des stats :", error);
      }
    }

    onMounted(loadCharts);
    onBeforeUnmount(() => {
      // clean memory
      Object.values(charts).forEach((chart) => chart.destroy());
    });
  },
};
</script>
<style lang="scss" scoped>
.chart-bg{
  background-color: rgba(var(--v-theme-background));
}

</style>