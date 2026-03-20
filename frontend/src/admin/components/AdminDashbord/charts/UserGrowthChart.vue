<template>
  <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

    <h3 class="text-xl font-bold text-slate-950">
      User Status Overview
    </h3>

    <p class="text-sm text-slate-600 mt-1">
      Active vs Locked users
    </p>

    <div class="mt-6 h-72 flex items-center justify-center">

      <Doughnut
        :data="chartData"
        :options="chartOptions"
      />

    </div>

  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "vue-chartjs";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const chartData = {

  labels: [
    "Active",
    "Locked"
  ],

  datasets: [
    {
      data: [120, 30],

      backgroundColor: [
        "#22c55e",
        "#ef4444"
      ],

      borderWidth: 0
    }
  ]
};

const chartOptions = {

  responsive: true,

  maintainAspectRatio: false,

  plugins: {

    legend: {
      position: "bottom"
    }

  }
};
</script>