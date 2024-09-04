<template>
  <!-- <div class="chartContainer"> -->
  <SubContent title="多行可滚动">
    <ECharts :option="chartOption" />
  </SubContent>
  <!-- </div> -->
</template>

<script setup>
import ECharts from "@/components/chartComponent/index.vue"
import SubContent from "@/components/subContent/index.vue"
import { getImagebase, getDataZoom, getChartFontSzie } from "@/utils/index"

import { ref } from "vue"

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const yDataList = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30"
]

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
      data: yDataList,
      type: "category",
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false }
    },
    {
      data: Array.from({ length: 30 }).map(() => getRandomInt(100, 200)),
      type: "category",
      position: "right",
      name: "增长数",
      nameLocation: "end",
      nameTextStyle: {
        align: "left",
        fontSize: getChartFontSzie(12),
        padding: [0, 0, 0, 0]
      },
      nameGap: 10,
      offset: 80,
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false }
    },
    {
      data: Array.from({ length: 30 }).map(() => getRandomInt(90, 110)),
      type: "category",
      position: "right",
      nameLocation: "end",
      name: "增长百分比",
      nameGap: 10,
      nameTextStyle: {
        align: "right",
        fontSize: getChartFontSzie(12),
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
            fontSize: getChartFontSzie(14),
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
            fontSize: getChartFontSzie(14),
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

  dataZoom: getDataZoom(yDataList, [0, 1, 2], false),
  series: [
    {
      data: Array.from({ length: 30 }).map(() => getRandomInt(100, 200)),
      type: "bar"
    }
  ]
})
</script>

<style lang="scss" scoped>
.chartContainer {
  height: calc(50vh - 0.5rem);
  width: 50%;
  display: flex;
}
</style>
