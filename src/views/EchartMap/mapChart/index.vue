<template>
  <SubContent title="年销售总量" v-slot="slotProps">
    <EChartsCom ref="echartsRefs" v-bind="slotProps" :option="mapOption" />
  </SubContent>
</template>

<script setup>
import EChartsCom from "@/components/chartComponent/index.vue"
import SubContent from "@/components/subContent/index.vue"
import mapData from "./result.json"
import * as echarts from "echarts"

import { ref, onUnmounted } from "vue"

const echartsRefs = ref(null)

onUnmounted(() => {
  echartsRefs.value = null
})

echarts.registerMap("china", mapData)

const mapOption = {
  textStyle: {
    fontSize: 16
  },
  grid: {
    left: 20,
    top: 20,
    containLabel: false
  },
  tooltip: {
    trigger: "item",
    padding: 0,
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  visualMap: [
    {
      type: "piecewise", //piecewise\continuous
      // min: isMinEquMax ? -1 : swRangeData.min,
      show: false,
      // max: swRangeData.max,
      itemWidth: 0,
      itemHeight: 0,
      dimension: 2,
      seriesIndex: 0,
      // pieces: getBrandMap(),
      hoverLink: false,
      realtime: true,
      calculable: true
      // color: disableGeo ? [] : visualMapColorList
    }
  ],
  geo: {
    type: "map",
    map: "china",
    roam: true,
    zlevel: 0,
    zoom: 1.2,
    itemStyle: {
      borderColor: "rgba(255,255,255, .6)",
      areaColor: "#98adc2"
    },
    emphasis: {
      label: {
        show: false
      },
      itemStyle: {
        borderColor: "rgba(255,255,255, .6)",
        areaColor: {
          type: "linear",
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0.08,
              color: "#54d3a5"
            },
            {
              offset: 1,
              color: "rgba(1,1,1,0.42)"
            }
          ],
          global: false // 缺省为 false}
        }
      }
    }
  },
  series: [],
  layoutCenter: ["50%", "65%"], //位置
  layoutSize: "100%" //大小
}
</script>

<style lang="scss" scoped>
.chartContainer {
  height: calc(50vh - 50px);
  width: 50%;
  display: flex;
}
</style>
