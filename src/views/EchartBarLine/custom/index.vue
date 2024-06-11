<template>
  <SubContent title="定制化" v-slot="slotProps">
    <ECharts :option="chartOption" v-bind="slotProps" />
  </SubContent>
</template>

<script setup>
import ECharts from "@/components/chartComponent/index.vue"
import SubContent from "@/components/subContent/index.vue"
import * as echarts from "echarts"
import { getRandomColor } from "@/utils/index"

import { ref } from "vue"

const obj = {
  2: 0.4,
  3: 0.3,
  4: 0.25,
  5: 0.2
}

const tankongta = {
  1: [
    {
      name: "土豆",
      chulitp: 444600,
      chulimop: 412059.2,
      chulikeneng: 369900,
      chulikmengx: "蔬菜"
    },
    {
      name: "茄子",
      chulitp: 456000,
      chulimop: 446420.3,
      chulikeneng: 394650,
      chulikmengx: "蔬菜"
    },
    {
      name: "大头菜",
      chulitp: 411150,
      chulimop: 379839.6,
      chulikeneng: 350700,
      chulikmengx: "蔬菜"
    }
  ],
  2: [
    {
      name: "香蕉",
      chulitp: 721600,
      chulimop: 654014.6,
      chulikeneng: 588200,
      chulikmengx: "水果"
    },
    {
      name: "苹果",
      chulitp: 898300,
      chulimop: 744974.3,
      chulikeneng: 659200,
      chulikmengx: "水果"
    },
    {
      name: "菠萝",
      chulitp: 651300,
      chulimop: 636654.7,
      chulikeneng: 582500,
      chulikmengx: "水果"
    }
  ],
  3: [
    {
      name: "猪肉",
      chulitp: 757400,
      chulimop: 633937.8,
      chulikeneng: 586000,
      chulikmengx: "肉"
    },
    {
      name: "羊肉",
      chulitp: 543000,
      chulimop: 492813.2,
      chulikeneng: 463000,
      chulikmengx: "肉"
    },
    {
      name: "牛肉",
      chulitp: 632400,
      chulimop: 551273.1,
      chulikeneng: 479700,
      chulikmengx: "肉"
    }
  ],
  4: [
    {
      name: "蔬菜沙拉",
      chulitp: null,
      chulimop: 981479.4,
      chulikeneng: 913800,
      chulikmengx: "沙拉"
    },
    {
      name: "水果沙拉",
      chulitp: 1471900,
      chulimop: 1243114.3,
      chulikeneng: 856000,
      chulikmengx: "沙拉"
    }
  ],
  5: [
    {
      name: "李晨吊坠",
      chulitp: 1059300,
      chulimop: 959300,
      chulikeneng: 859300,
      chulikmengx: "吊坠"
    },
    {
      name: "心形吊坠",
      chulitp: 1259300,
      chulimop: 1199300,
      chulikeneng: 1159300,
      chulikmengx: "吊坠"
    },
    {
      name: "玻璃吊坠",
      chulitp: 1359300,
      chulimop: 1259300,
      chulikeneng: 1159300,
      chulikmengx: "吊坠"
    },
    {
      name: "水晶吊坠",
      chulitp: 1559300,
      chulimop: 1459300,
      chulikeneng: 1359300,
      chulikmengx: "吊坠"
    },
    {
      name: "砖石吊坠",
      chulitp: 832500,
      chulimop: 783943,
      chulikeneng: 724900,
      chulikmengx: "吊坠"
    }
  ],
  6: [
    {
      name: "周大福",
      chulitp: 1143500,
      chulimop: 1066874.2,
      chulikeneng: 1000000,
      chulikmengx: "金价"
    },
    {
      name: "周生生",
      chulitp: 1676300,
      chulimop: 1381317.5,
      chulikeneng: 1027700,
      chulikmengx: "金价"
    }
  ]
}

const chulikddk = (tankongta) => {
  const jkes = {},
    kuaes = []
  for (const i in tankongta) {
    const arrname = [],
      hel2 = []
    tankongta[i].map((v, index) => {
      hel2.push(v.chulitp)
      hel2.push(v.chulikeneng)
      hel2.push(v.chulimop)
      if (index === 0) {
        jkes[i] = v.chulikmengx
      }
    })
    const _max = Math.max.apply(Math, hel2)
    const _min = Math.min.apply(Math, hel2)
    arrname.push(i, _max, _min, tankongta[i])
    kuaes.push(arrname)
  }
  return { data: kuaes, title: jkes }
}

const data0 = chulikddk(tankongta)
const _data0 = data0.data

const chartOption = ref({
  legend: { show: false },
  tooltip: {
    trigger: "item",
    show: true,
    formatter: function () {
      return "数量："
    }
  },
  grid: [
    {
      top: 20,
      left: 20,
      right: 10,
      bottom: 30,
      containLabel: true
    }
  ],
  xAxis: [
    {
      type: "category",
      axisLine: {
        show: false
      },
      axisPointer: {
        show: true,
        type: "shadow",
        shadowStyle: {
          opacity: 0.3
        },
        label: {
          show: false
        }
      },
      axisTick: { show: true },
      position: "bottom",
      axisLabel: {
        show: true,
        interval: 0,
        textStyle: {
          fontSize: 12,
          color: "transparent"
        },
        margin: 20,
        width: 200,
        overflow: "break",
        formatter: () => {
          return " "
        }
      },

      data: Object.keys(data0.title)
    }
  ],
  yAxis: [
    {
      type: "value",
      splitNumber: 3,
      axisTick: false,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      }
    }
  ],

  series: [
    {
      name: "group",
      type: "custom",
      data: _data0,
      encode: {
        x: [0],
        y: [1, 2, 3]
      },
      renderItem: function (params, api) {
        const categoryIndex = api.value(0)
        const chartHeight = api.getHeight()
        const goutE = []
        const hel2 = tankongta?.[api.value(0) + 1] || []
        const helwd = hel2.length
        hel2.map((v, index) => {
          const top = v.chulitp
          const bottom = v.chulikeneng
          const chulikmengx = v.chulikmengx
          const wm = v.chulimop
          let name = v.name
          const end = api.coord([categoryIndex, top])
          const center = api.coord([categoryIndex, wm])
          const start = api.coord([categoryIndex, bottom])
          let hW = 0
          const xWitdh = api.size([0, 1])[0]
          hW = api.size([0, 1])[0] * obj[hel2.length]

          const bW = api.size([0, 1])[0] * 0.15

          let _x = bW / 2
          if (helwd % 2) {
            _x = _x + ((helwd + 1) / 2 - 1 - index) * hW
          } else if (!(helwd % 2)) {
            _x = _x + (helwd / 2 - (index + 0.5)) * hW
          }

          const style = api.style({
            stroke: getRandomColor(),
            lineWidth: 2
          })

          const nameWidth = echarts.format.getTextRect(name).width

          const chulikmengxSize = 18
          if (nameWidth > bW * 2) {
            name = name.substring(0, 2) + ".."
          }

          if (index === 0) {
            goutE.push({
              type: "rect",
              shape: {
                y: chartHeight - 24,
                x: start[0] - xWitdh / 2,
                width: xWitdh,
                height: 23
              },
              style: api.style({
                fill: "transparent",
                stroke: "transparent",
                text: chulikmengx,
                textFill: "#fff",
                fontSize: chulikmengxSize,
                textVerticalAlign: "center"
              })
            })
          }

          goutE.push({
            type: "rect",
            shape: {
              y: chartHeight - 48,
              x: center[0] - _x,
              width: bW,
              height: 20
            },
            style: api.style({
              fill: "transparent",
              stroke: "transparent",
              text: name,
              textFill: "#fff",
              fontSize: 13
            })
          })

          bottom !== null &&
            goutE.push({
              type: "line",
              transition: ["shape"],
              shape: {
                x1: start[0] - _x,
                y1: start[1],
                x2: start[0] - _x + bW,
                y2: start[1]
              },
              style: style
            })

          wm !== null &&
            goutE.push({
              type: "line",
              transition: ["shape"],
              shape: {
                x1: center[0] - _x,
                y1: center[1],
                x2: center[0] - _x + bW,
                y2: center[1]
              },
              style: style
            })

          top !== null &&
            goutE.push({
              type: "line",
              transition: ["shape"],
              shape: {
                x1: end[0] - _x,
                y1: end[1],
                x2: end[0] - _x + bW,
                y2: end[1]
              },
              style: style
            })

          bottom !== null &&
            top !== null &&
            goutE.push({
              type: "line",
              transition: ["shape"],
              shape: {
                x1: start[0] - _x,
                y1: start[1],
                x2: start[0] - _x,
                y2: end[1]
              },
              style: style
            })

          bottom !== null &&
            wm !== null &&
            goutE.push({
              type: "line",
              transition: ["shape"],
              shape: {
                x1: start[0] - _x,
                y1: start[1],
                x2: start[0] - _x,
                y2: center[1]
              },
              style: style
            })

          wm !== null &&
            top !== null &&
            goutE.push({
              type: "line",
              transition: ["shape"],
              shape: {
                x1: center[0] - _x,
                y1: center[1],
                x2: center[0] - _x,
                y2: end[1]
              },
              style: style
            })

          bottom !== null &&
            top !== null &&
            goutE.push({
              type: "line",
              transition: ["shape"],
              shape: {
                x1: start[0] - _x + bW,
                y1: start[1],
                x2: start[0] - _x + bW,
                y2: end[1]
              },
              style: style
            })

          bottom !== null &&
            wm !== null &&
            goutE.push({
              type: "line",
              transition: ["shape"],
              shape: {
                x1: start[0] - _x + bW,
                y1: start[1],
                x2: start[0] - _x + bW,
                y2: center[1]
              },
              style: style
            })

          top !== null &&
            wm !== null &&
            goutE.push({
              type: "line",
              transition: ["shape"],
              shape: {
                x1: center[0] - _x + bW,
                y1: center[1],
                x2: center[0] - _x + bW,
                y2: end[1]
              },
              style: style
            })
        })

        return {
          type: "group",
          children: [...goutE]
        }
      }
    }
  ]
})
</script>

<style lang="scss" scoped>
.chartContainer {
  height: calc(50vh - 50px);
  width: 50%;
  display: flex;
}
</style>
