<template>
  <SubContent title="年销售总量" v-slot="slotProps">
    <EChartsCom :qwid="slotProps" :option="chartOption" />
  </SubContent>
</template>

<script setup>
import EChartsCom from "@/components/chartComponent/index.vue"
import SubContent from "@/components/subContent/index.vue"
import { getImagebase } from "@/utils/index"

import { ref } from "vue"

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const chartOption = ref({
  xAxis: {
    type: "value",
    scale: true,
    boundaryGap: ["20%", "20%"],
    axisLine: { show: false },
    splitLine: { show: false },
    axisTick: { show: false }
  },
  yAxis: [
    {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      type: "category",
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false }
    },
    {
      data: Array.from({ length: 7 }).map(() => getRandomInt(100, 200)),
      type: "category",
      position: "right",
      name: "增长数",
      nameLocation: "end",
      nameTextStyle: {
        align: "left",
        fontSize: 12,
        padding: [0, 0, 0, 0]
      },
      nameGap: 10,
      offset: 80,
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false }
    },
    {
      data: Array.from({ length: 7 }).map(() => getRandomInt(90, 110)),
      type: "category",
      position: "right",
      nameLocation: "end",
      name: "增长百分比",
      nameGap: 10,
      nameTextStyle: {
        align: "right",
        fontSize: 12,
        padding: [0, -8, 0, 0]
      },
      offset: 240,
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        interval: 0,
        align: "right",
        formatter: (val) => {
          return Number(val) >= 100 ? `{blod|${val}%    }` : `{regular|${val}%    }`
        },
        rich: {
          regular: {
            width: 8,
            height: 8,
            color: "red",
            fontSize: 13,
            backgroundColor: {
              image: getImagebase("../../src/assets/imgs/arrow-down.png"),
              align: "right"
            },
            verticalAlign: "middle"
          },
          blod: {
            width: 8,
            height: 8,
            color: "green",
            fontSize: 13,
            backgroundColor: {
              image: getImagebase("../../src/assets/imgs/arrow-up.png"),
              align: "right"
            },
            verticalAlign: "middle"
          }
        }
      }
    }
  ],
  grid: [{ left: "3%", top: "10%", bottom: "5%", right: "25%", containLabel: true }],
  animation: true,
  series: [
    {
      data: Array.from({ length: 7 }).map(() => getRandomInt(100, 200)),
      type: "bar"
    }
  ]
})

setInterval(() => {
  chartOption.value = Object.assign({}, chartOption.value, {
    series: [
      {
        data: Array.from({ length: 7 }).map(() => getRandomInt(100, 200)),
        type: "bar"
      }
    ]
  })
}, 2000)
</script>

<style lang="scss" scoped>
.chartContainer {
  height: calc(50vh - 50px);
  width: 50%;
  display: flex;
}
</style>
