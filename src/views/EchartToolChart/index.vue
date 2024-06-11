<template>
  <div class="pageContenter">
    <PageFrame :defisblock="true" defBlockName="line-chart" :componentList="chartList" />
  </div>
</template>

<script setup>
import PageFrame from "@/components/pageFrame/index.vue"
import Chart2 from "./Chart2/index.vue"

const chartList = [
  {
    id: "line-chart",
    renderCompoment: Chart2
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
