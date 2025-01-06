<script setup>
import HighchartsVue from "highcharts-vue";
import { onUpdated, onMounted, ref, watch } from "vue";

const props = defineProps({ title: String, mapView: Object });

const emit = defineEmits(["update:mapView"]);

const mapChartOptions = {
  chart: {
    margin: 0,
    height: "56.25%",
    spacing: [16, 16, 16, 16],
    events: {
      redraw: (ev) => {
        const mapView = {
          center: ev.target.mapView.center,
          zoom: ev.target.mapView.zoom,
          chart: props.title,
        };

        if (
          mapView.center != props.mapView.center ||
          mapView.zoom != props.mapView.zoom
        ) {
          emit("update:mapView", mapView);
        }
      },
    },
  },
  title: {
    text: props.title,
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      alignTo: "spacingBox",
      align: "right",
    },
    /* enableDoubleClickZoom: true,
     * enableMouseWheelZoom: false, */
  },
  mapView: {
    fitToGeometry: {
      type: "MultiPoint",
      coordinates: [
        [10.7721, 46.423],
        [11.11547778, 47.4119833],
        [8.15815944, 52.72753556],
      ],
    },
    padding: 25,
  },
  plotOptions: {
    mappoint: {
      dataLabels: {
        enabled: false,
      },
    },
  },
  series: [
    {
      type: "tiledwebmap",
      name: "Basemap Tiles",
      provider: {
        type: "Esri",
        theme: "WorldGrayCanvas",
      },
      showInLegend: false,
    },
    {
      type: "mappoint",
      name: "> 1kW",
      data: [
        {
          name: "Station 1",
          lat: 46.423,
          lon: 10.7721,
          power: 1.04,
        },
      ],
    },
    {
      type: "mappoint",
      name: "> 2kW",
      data: [
        {
          name: "Station 2",
          lat: 47.4119833,
          lon: 11.11547778,
          power: 2.46,
        },
        {
          name: "Station 3",
          lat: 52.72753556,
          lon: 8.15815944,
          power: 2.37,
        },
      ],
    },
  ],
};

const chart = ref();

/* Fired after the highcharts component is initialised. */
watch(chart, (val, oldVal) => {
  const mapView = {
    center: val.chart.mapView.center,
    zoom: val.chart.mapView.zoom,
    chart: props.title,
  };

  emit("update:mapView", mapView);
});

onUpdated(() => {
  resetFitToGeometry();
  updateMapView();
});

/**
 * Resets the fit-to-geometry settings
 * after initialisation to allow moving the map.
 */
function resetFitToGeometry() {
  if (
    chart.value &&
    chart.value.chart.mapView.userOptions.fitToGeometry != null
  ) {
    chart.value.chart.mapView.playingField = undefined;
    chart.value.chart.mapView.minZoom = undefined;
    chart.value.chart.mapView.update(
      { fitToGeometry: undefined, padding: 0, minZoom: undefined },
      false,
    );

    chart.value.chart.mapView.setView(
      props.mapView.center,
      props.mapView.zoom,
      true,
      true,
    );
  }
}

/**
 * Called after map view properties have changed.
 * Update the chart if necessary.
 */
function updateMapView() {
  if (
    chart.value &&
    (chart.value.chart.mapView.center != props.mapView.center ||
      props.mapView.zoom != props.mapView.zoom)
  ) {
    chart.value.chart.mapView.setView(
      props.mapView.center,
      props.mapView.zoom,
      true,
      true,
    );
  }
}
</script>

<template>
  <highcharts
    :constructor-type="'mapChart'"
    :options="mapChartOptions"
    ref="chart"
  ></highcharts>
</template>
