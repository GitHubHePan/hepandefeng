<template>
  <div class="pageContenter">
    <PageFrame :def-is-zoome-in="false" :componentList="chartList" />
  </div>
</template>

<script setup>
import PageFrame from "@/components/pageFrame/index.vue"
import BarChart from "./barChart/index.vue"
import BarChart2 from "./barChart2/index.vue"
import LineChart from "./lineChart/index.vue"
import CustomChart from "./custom/index.vue"

const chartList = [
  {
    id: "bar-chart",
    renderCompoment: BarChart
  },
  {
    id: "line-chart",
    renderCompoment: LineChart
  },
  {
    id: "bar-chart2",
    renderCompoment: BarChart2
  },
  {
    id: "custom-chart",
    renderCompoment: CustomChart
  }
]
</script>

<style lang="scss" scoped>
.pageContenter {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>
