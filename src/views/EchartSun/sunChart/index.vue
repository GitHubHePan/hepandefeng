<template>
  <SubContent title="年销售总量" v-slot="slotProps">
    <EChartsCom ref="echartsRefs" v-bind="slotProps" :option="chartOption" />
  </SubContent>
</template>

<script setup>
import EChartsCom from "@/components/chartComponent/index.vue"
import SubContent from "@/components/subContent/index.vue"

import { ref, onMounted } from "vue"

const echartsRefs = ref(null)

onMounted(() => {
  hoverChart()
})

const getIndexs = (option = {}, params) => {
  const series = option.series || []
  const _data = series.find((v) => v.name === params.seriesName)?.data || []
  const arr = []
  _data.forEach((v, index) => {
    if (v.name === params.name && v.hellowName === (params.data?.hellowName || "")) arr.push(index)
  })
  return arr
}

const hoverChart = () => {
  const chartInstance = echartsRefs.value.getChartInstance()
  if (!chartInstance) return
  chartInstance.off("mouseover")
  chartInstance.on("mouseover", "series", (params) => {
    const options = chartInstance.getOption()
    const indexsName = getIndexs(options, params)
    if (params.seriesName === "typeInner" || params.seriesName === "typeOuter") {
      chartInstance.dispatchAction({
        type: "highlight",
        dataIndex: indexsName,
        seriesIndex: params.seriesIndex,
        seriesName: params.seriesName
      })
    }
  })

  chartInstance.off("mouseout")
  chartInstance.on("mouseout", "series", (params) => {
    if (params.seriesName === "typeInner" || params.seriesName === "typeOuter") {
      chartInstance.dispatchAction({
        type: "downplay",
        seriesIndex: params.seriesIndex
      })
    }
  })
}

const hellowcccData = {
  hellowciie: [
    {
      value: [5],
      name: "水果",
      hellowName: "水果",
      itemStyle: {
        color: "#9febae"
      }
    },
    {
      value: [13],
      name: "大众",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [13],
      name: "那边",
      hellowName: "那边",
      itemStyle: {
        color: "#fbe37a"
      }
    },
    {
      value: [7],
      name: "蔬菜",
      hellowName: "蔬菜",
      itemStyle: {
        color: "#73edff"
      }
    },
    {
      value: [21],
      name: "那边",
      hellowName: "那边",
      itemStyle: {
        color: "#fbe37a"
      }
    },
    {
      value: [8],
      name: "蔬菜",
      hellowName: "蔬菜",
      itemStyle: {
        color: "#73edff"
      }
    },
    {
      value: [15],
      name: "水果",
      hellowName: "水果",
      itemStyle: {
        color: "#9febae"
      }
    },
    {
      value: [31],
      name: "大众",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [6],
      name: "蔬菜",
      hellowName: "蔬菜",
      itemStyle: {
        color: "#73edff"
      }
    },
    {
      value: [15],
      name: "大众",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [4],
      name: "水果",
      hellowName: "水果",
      itemStyle: {
        color: "#9febae"
      }
    },
    {
      value: [12],
      name: "那边",
      hellowName: "那边",
      itemStyle: {
        color: "#fbe37a"
      }
    },
    {
      value: [150],
      name: "out",
      itemStyle: {
        color: "rgba(255,255,255,0)"
      }
    }
  ],
  hellowlkf: [
    {
      value: [2.2],
      name: "香蕉",
      hellowName: "水果",
      itemStyle: {
        color: "#9febae"
      }
    },
    {
      value: [2.8],
      name: "芒果西番莲",
      hellowName: "水果",
      itemStyle: {
        color: "#9febae"
      }
    },
    {
      value: [2],
      name: "保时捷",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [3],
      name: "宾利",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [3],
      name: "兰博基尼",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [5],
      name: "布加迪",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [4],
      name: "马栏子哈哈哈",
      hellowName: "那边",
      itemStyle: {
        color: "#fbe37a"
      }
    },
    {
      value: [4],
      name: "水师营",
      hellowName: "那边",
      itemStyle: {
        color: "#fbe37a"
      }
    },
    {
      value: [5],
      name: "葡萄沟",
      hellowName: "那边",
      itemStyle: {
        color: "#fbe37a"
      }
    },
    {
      value: [3],
      name: "东红柿",
      hellowName: "蔬菜",
      itemStyle: {
        color: "#73edff"
      }
    },
    {
      value: [4],
      name: "西红柿",
      hellowName: "蔬菜",
      itemStyle: {
        color: "#73edff"
      }
    },
    {
      value: [4],
      name: "水师营",
      hellowName: "那边",
      itemStyle: {
        color: "#fbe37a"
      }
    },
    {
      value: [8],
      name: "葡萄沟",
      hellowName: "那边",
      itemStyle: {
        color: "#fbe37a"
      }
    },
    {
      value: [9],
      name: "马栏子",
      hellowName: "那边",
      itemStyle: {
        color: "#fbe37a"
      }
    },
    {
      value: [3],
      name: "东红柿",
      hellowName: "蔬菜",
      itemStyle: {
        color: "#73edff"
      }
    },
    {
      value: [5],
      name: "西红柿",
      hellowName: "蔬菜",
      itemStyle: {
        color: "#73edff"
      }
    },
    {
      value: [7],
      name: "香蕉",
      hellowName: "水果",
      itemStyle: {
        color: "#9febae"
      }
    },
    {
      value: [8],
      name: "芒果",
      hellowName: "水果",
      itemStyle: {
        color: "#9febae"
      }
    },
    {
      value: [7],
      name: "布加迪",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [7],
      name: "兰博基尼",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [8],
      name: "宾利",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [9],
      name: "保时捷",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [3],
      name: "西红柿",
      hellowName: "蔬菜",
      itemStyle: {
        color: "#73edff"
      }
    },
    {
      value: [3],
      name: "东红柿",
      hellowName: "蔬菜",
      itemStyle: {
        color: "#73edff"
      }
    },

    {
      value: [3],
      name: "兰博基尼",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [3],
      name: "布加迪",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [4],
      name: "保时捷",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [5],
      name: "宾利",
      hellowName: "大众",
      itemStyle: {
        color: "#ffa3c4"
      }
    },
    {
      value: [1.5],
      name: "芒果",
      hellowName: "水果",
      itemStyle: {
        color: "#9febae"
      }
    },
    {
      value: [2.5],
      hellowName: "水果",
      name: "香蕉",
      itemStyle: {
        color: "#9febae"
      }
    },

    {
      value: [3],
      name: "葡萄沟",
      hellowName: "那边",

      itemStyle: {
        color: "#fbe37a"
      }
    },
    {
      value: [4],
      name: "水师营",
      hellowName: "那边",
      itemStyle: {
        color: "#fbe37a"
      }
    },
    {
      value: [5],
      name: "马栏子",
      hellowName: "那边",
      itemStyle: {
        color: "#fbe37a"
      }
    },
    {
      value: 150,
      name: "out",
      itemStyle: {
        color: "rgba(255,255,255,0)"
      }
    }
  ],
  all: 150
}

const chartOption = ref({
  animationType: "scale",
  grid: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  tooltip: {
    trigger: "item",
    formatter: function (e) {
      return "数量：" + e.value[0]
    }
  },
  series: [
    {
      name: "typeInner",
      type: "pie",
      radius: ["85%", "125%"],
      startAngle: 180,
      center: ["50%", "100%"],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: "inner",
        color: "rgba(1,1,1,.5)"
      },
      itemStyle: {
        borderColor: "rgba(255,255,255,.5)"
      },
      hoverOffset: 8,
      labelLine: {
        show: false
      },
      emphasis: {
        itemStyle: {
          borderWidth: 2,
          shadowOffsetY: 2,
          shadowOffsetX: 2,
          borderColor: "rgba(255,255,255,1)",
          shadowColor: `rgba(0, 0, 0, 0.5)`,
          shadowBlur: 3
        }
      },
      encode: {
        value: [0]
      },
      data: hellowcccData.hellowciie
    },
    {
      name: "Inter-border-Outer",
      type: "pie",
      radius: ["125%", "125.5%"],
      startAngle: 180,
      center: ["50%", "100%"],
      avoidLabelOverlap: false,
      label: {
        show: false
      },
      hoverOffset: 0,

      labelLine: {
        show: false
      },
      itemStyle: {
        borderWidth: 2,
        borderColor: "rgba(255,255,255,1)"
      },
      data: [
        {
          name: "",
          value: 500
        }
      ]
    },
    {
      name: "typeOuter",
      type: "pie",
      radius: ["125.5%", "180%"],
      startAngle: 180,
      center: ["50%", "100%"],
      hoverOffset: 7,
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: "inner",
        rotate: true,
        color: "rgba(1,1,1,.5)"
      },
      itemStyle: {
        borderColor: "rgba(255,255,255,.5)"
      },
      emphasis: {
        itemStyle: {
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          borderColor: "rgba(255,255,255,1)",
          shadowColor: `rgba(0, 0, 0, 0.5)`,
          shadowBlur: 4,
          borderWidth: 2
        }
      },

      labelLine: {
        show: false
      },
      encode: {
        value: [0]
      },
      data: hellowcccData.hellowlkf
    }
  ],
  polar: {
    center: ["50%", "100%"],
    radius: ["45%", "180%"]
  },
  radiusAxis: {
    type: "value",
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
    splitLine: { show: false }
  },
  angleAxis: {
    type: "value",
    startAngle: 180,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
    splitLine: { show: false },
    min: 0,
    max: hellowcccData.all * 2
  }
})
</script>

<style lang="scss" scoped>
.chartContainer {
  height: calc(50vh - 0.5rem);
  width: 50%;
  display: flex;
}
</style>
