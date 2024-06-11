<template>
  <div class="pageContenter">
    <PageFrame :defisblock="true" defBlockName="sun-chart" :componentList="chartList" />
  </div>
</template>

<script setup>
import PageFrame from "@/components/pageFrame/index.vue"
import SunChart from "./sunChart/index.vue"

const chartList = [
  {
    id: "sun-chart",
    renderCompoment: SunChart
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
