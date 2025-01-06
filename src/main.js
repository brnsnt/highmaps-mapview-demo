

import { createApp } from "vue";
import App from "./App.vue";
import HighchartsVue from "highcharts-vue";
//import Highcharts from "highcharts";
//import Maps from "highcharts/modules/map";
import Highcharts from "highcharts/highcharts";
import "highcharts/modules/map";
import "highcharts/modules/tiledwebmap";

//Maps(Highcharts);
const app = createApp(App);

app.use(HighchartsVue);
app.mount("#app");

Highcharts.setOptions({
  lang: {
    locale: "en",
  },
});
