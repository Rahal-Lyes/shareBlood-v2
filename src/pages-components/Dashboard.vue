<template>
  <div class="p-6 bg-gray-100" style="height: 1000px;">
    <h1 class="text-3xl font-bold mb-8 text-center">Blood Donors by Blood Type</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <!-- Bar Chart -->
      <div class="bg-white p-4 rounded-2xl shadow-md">
        <h2 class="text-xl font-semibold text-center mb-2">Bar Chart</h2>
        <Bar :data="chartData" :options="chartOptions" />
      </div>

      <!-- Doughnut Chart -->
      <div class="bg-white p-4 rounded-2xl shadow-md">
        <h2 class="text-xl font-semibold text-center mb-2">Doughnut Chart</h2>
        <Doughnut :data="chartData" :options="doughnutOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend, Title)

const chartData = {
  labels: ['A+', 'A−', 'O', 'O+'],
  datasets: [
    {
      label: 'Number of Donors',
      data: [25, 10, 17, 40],
      backgroundColor: ['#f87171', '#facc15', '#60a5fa', '#34d399'],
      borderRadius: 8,
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Blood Donor Distribution (Bar)',
      font: {
        size: 18,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 5,
      },
    },
  },
}

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Blood Donor Distribution (Doughnut)',
      font: {
        size: 18,
      },
    },
  },
}
</script>

<style scoped>
</style>
