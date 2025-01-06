<script setup>
import MapChart from "./MapChart.vue";
import { ref } from "vue";

const mapView = ref({ center: [0, 0], zoom: 2, chart: null });
</script>

<template>
  <div>
    Center: {{ mapView.center }}, Zoom: {{ mapView.zoom }}, Master:
    {{ mapView.chart }}
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; padding: 1em">
    <div>
      <MapChart title="Chart 1" v-model:mapView="mapView" />
    </div>
    <div>
      <MapChart title="Chart 2" v-model:mapView="mapView" />
    </div>
  </div>
</template>
