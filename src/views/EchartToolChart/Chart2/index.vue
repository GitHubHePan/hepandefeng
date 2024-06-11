<template>
  <SubContent title="在浮窗上画chart图" v-bind="props" v-slot="slotProps">
    <ECharts :option="chartOption" :id="slotProps.id ?? ''" />
  </SubContent>
</template>

<script setup>
import ECharts from "@/components/chartComponent/index.vue"
import * as echarts from "echarts"
import SubContent from "@/components/subContent/index.vue"
import { getCFS } from "@/utils/index"
import { computed, ref, defineProps } from "vue"

const props = defineProps({
  isBlockSize: {
    default: false // 设置默认值
  }
})

const myChartCon = ref(null)
const myChart = ref(null)

const xAxisData = ["水果", "那边", "蔬菜", "大众"]

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const seriesData = [
  {
    type: "bar",
    name: "bianchenghuaduo",
    data: Array.from({ length: 4 }).map(() => getRandomInt(100, 200)),
    barWidth: 22.1,
    label: {
      show: false
    },
    xAxisIndex: 0,
    yAxisIndex: 0,
    stack: "teleservices"
  },
  {
    type: "bar",
    name: "kuishiwo",
    data: Array.from({ length: 4 }).map(() => getRandomInt(100, 200)),
    barWidth: 22.1,
    label: {
      show: false,
      position: "insideBottom"
    },
    xAxisIndex: 0,
    yAxisIndex: 0,
    stack: "teleservices"
  },
  {
    type: "line",
    name: "香蕉",
    data: Array.from({ length: 4 }).map(() => getRandomInt(100, 200)),
    lineStyle: {
      width: 1.3
    },
    symbol: "circle",
    smooth: true,
    symbolSize: 4.4,
    label: {
      show: false
    },
    xAxisIndex: 1,
    yAxisIndex: 1
  },
  {
    type: "line",
    name: "苹果",
    data: Array.from({ length: 4 }).map(() => getRandomInt(100, 200)),
    lineStyle: {
      width: 1.3
    },
    symbol: "circle",
    smooth: true,
    symbolSize: 4.4,
    label: {
      show: false
    },
    xAxisIndex: 1,
    yAxisIndex: 1
  }
]

/** 定义计算属性 layoutClasses，用于控制布局的类名 */
const chartOption = computed(() => {
  return {
    tooltip: {
      trigger: "axis",
      confine: true,
      padding: 0,
      formatter: () => {
        Promise.resolve()
          .then(() => {
            if (!myChartCon.value) {
              myChartCon.value = document.createElement("div")
              myChartCon.value.setAttribute("id", "echartTooltipChart")
            }
            const parentDiv = document.getElementById("echartTooltipChartCon")
            parentDiv.appendChild(myChartCon.value)
          })
          .then(() => {
            if (!myChart.value) {
              myChart.value = echarts.init(document.getElementById("echartTooltipChart"), null, {
                width: "300px",
                height: "200px"
              })
            }
            const option = {
              yAxis: {
                type: "value",
                scale: true,
                boundaryGap: ["20%", "20%"],
                axisLine: { show: false },
                splitLine: { show: false },
                axisTick: { show: false }
              },
              xAxis: [
                {
                  data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  type: "category",
                  axisLine: { show: false },
                  splitLine: { show: false },
                  axisTick: { show: false }
                }
              ],
              grid: [{ left: "3%", top: "10%", bottom: "5%", right: "3%", containLabel: true }],
              animation: true,
              series: [
                {
                  data: Array.from({ length: 7 }).map(() => getRandomInt(100, 200)),
                  type: "bar"
                }
              ]
            }
            myChart.value.setOption(option)
          })
        return `<div class="tootip-contenter">
                  <div class="tooltip-title tooltip-line">在浮窗上画chart图</div>
                  <div id="echartTooltipChartCon" style="height: 200px; width: 300px" class="tooltip-content">
                  </div>
                </div>`
      }
    },
    textStyle: {},
    grid: [
      {
        top: "55%",
        left: getCFS(30),
        right: getCFS(30),
        bottom: getCFS(0),
        containLabel: true
      },
      {
        top: getCFS(90),
        left: getCFS(30),
        right: getCFS(30),
        bottom: "45%",
        containLabel: true
      }
    ],
    xAxis: [
      {
        type: "category",
        data: xAxisData,
        axisLine: {
          show: true,
          lineStyle: {
            width: 1
          }
        },
        axisTick: true,
        axisLabel: {
          show: true,
          interval: 0,
          textStyle: {}
        },
        gridIndex: 0
      },
      {
        type: "category",
        data: xAxisData,
        position: "top",
        axisLine: {
          show: false,
          lineStyle: {
            width: 0.5
          }
        },
        axisTick: true,
        axisLabel: { show: false },
        gridIndex: 1
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        position: "left",
        gridIndex: 0
      },
      {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        position: "left",
        gridIndex: 1
      }
    ],
    axisPointer: {
      link: {
        xAxisIndex: [0, 1]
      }
    },
    series: seriesData
  }
})
</script>

<style lang="scss" scoped>
.chartContainer {
  height: calc(50vh - 50px);
  width: 50%;
  display: flex;
}
.tootip-contenter {
  height: 200px;
  width: 300px;
}
</style>
