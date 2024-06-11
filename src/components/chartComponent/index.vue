<script lang="ts" setup>
import { onMounted, onUnmounted, ref, computed, watch } from "vue"
import ResizeObserver from "resize-observer-polyfill"
import { BarChart, LineChart, FunnelChart, ScatterChart, CustomChart } from "echarts/charts"
import { GridComponent, TitleComponent, LegendComponent, TooltipComponent, DataZoomComponent } from "echarts/components"
import { CanvasRenderer } from "echarts/renderers"
import * as echarts from "echarts"
import _ from "lodash-es"

interface chartProps {
  className?: string
  id?: string
  useRandomColor?: boolean
  option?: any
}

const props = withDefaults(defineProps<chartProps>(), {
  className: "",
  id: "chart-item",
  useRandomColor: true,
  option: {}
})

console.log(props)

const echartsRef = ref(null)
let chartInstance: any = null

const resizeChart = () => {
  console.log(chartInstance)

  if (!chartInstance || chartInstance.isDisposed()) return
  Promise.resolve()
    .then(() => {
      chartInstance && chartInstance.resize()
    })
    .then(() => {
      renderChart(props.option)
    })
}

const getChartInstance = () => {
  return chartInstance
}

onMounted(() => {
  if (!echartsRef.value) {
    return
  }
  ;(echarts as any).use([
    BarChart,
    ScatterChart,
    CustomChart,
    FunnelChart,
    LineChart,
    GridComponent,
    TooltipComponent,
    DataZoomComponent,
    LegendComponent,
    TitleComponent,
    CanvasRenderer
  ])
  chartInstance = echarts.init(echartsRef.value, null, { devicePixelRatio: 2 })
  console.log(props)

  chartInstance.setOption(props.option)
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // const width = entry.contentRect.width
      // const height = entry.contentRect.height
      // 处理尺寸变化
      console.log(entry)

      resizeChart()
    }
  })

  if (echartsRef.value) {
    resizeObserver.observe(echartsRef.value)
  }
})

onUnmounted(() => {
  chartInstance && chartInstance.dispose()
})

defineExpose({
  getChartInstance
})

/** 定义计算属性 layoutClasses，用于控制布局的类名 */
const layoutClasses = computed(() => {
  const classes = ["common-chart-container"]
  if (props.className) {
    classes.push(props.className)
  }
  return classes.join(" ")
})

const renderChart = (newOption: any) => {
  if (!chartInstance || chartInstance.isDisposed()) return
  const commomOpts = {
    textStyle: {
      color: "#fff",
      fontSize: 16
    },

    tooltip: {
      color: "#fff",
      backgroundColor: "rgba(0,0,0,.7)",
      borderWidth: 0
    }
  }
  const __option = _.merge(commomOpts, newOption)

  chartInstance.setOption(__option, true, true)
}

// 监听option变化重新设置
watch(
  () => props.option,
  (newOption) => {
    if (chartInstance && !chartInstance.isDisposed()) {
      renderChart(newOption)
    }
  },
  { deep: true }
)
</script>

<template>
  <div ref="echartsRef" :id="id" :class="layoutClasses" />
</template>

<style lang="scss" scoped>
.common-chart-container {
  height: calc(100% - 0.4rem);
  flex: 1;
}
</style>
