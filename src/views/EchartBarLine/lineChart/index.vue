<template>
  <!-- <div class="line-chartContainer"> -->
  <SubContent title="销售曲线波动">
    <ECharts :option="chartOption" />
  </SubContent>
  <!-- </div> -->
</template>

<script setup>
import ECharts from "@/components/chartComponent/index.vue"
import SubContent from "@/components/subContent/index.vue"

import { ref } from "vue"

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const chartOption = ref({
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisLine: { show: false },
    splitLine: { show: false },
    axisTick: { show: false }
  },
  legend: [
    {
      data: ["预购", "成交"],
      icon: "circle",
      textStyle: {
        fontSize: 12,
        color: "white",
        padding: [3, 0, 2]
      },
      x: 20,
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderRadius: 0,

      top: 0
    }
  ],
  grid: [{ left: "3%", top: "15%", bottom: "5%", right: "5%", containLabel: true }],
  yAxis: [
    {
      type: "value",
      scale: true,
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      boundaryGap: ["20%", "20%"]
    }
  ],
  animation: true,
  series: [
    {
      data: Array.from({ length: 7 }).map(() => getRandomInt(100, 200)),
      type: "line",
      smooth: true,
      name: "成交"
    },
    {
      data: Array.from({ length: 7 }).map(() => getRandomInt(100, 200)),
      type: "line",
      smooth: true,
      name: "预购"
    }
  ]
})

setInterval(() => {
  chartOption.value = Object.assign({}, chartOption.value, {
    series: [
      {
        data: Array.from({ length: 7 }).map(() => getRandomInt(100, 200)),
        type: "line",
        smooth: true,
        name: "成交"
      },
      {
        data: Array.from({ length: 7 }).map(() => getRandomInt(100, 200)),
        type: "line",
        smooth: true,
        name: "预购"
      }
    ]
  })
}, 2000)
</script>

<style lang="scss" scoped>
.line-chartContainer {
  height: calc(50vh - 50px);
  width: 50%;
  display: flex;
}
</style>
