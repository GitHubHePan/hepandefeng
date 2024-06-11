import dayjs from "dayjs"
import { removeConfigLayout } from "@/utils/cache/local-storage"

/** 格式化时间 */
export const formatDateTime = (time: string | number | Date) => {
  return time ? dayjs(new Date(time)).format("YYYY-MM-DD HH:mm:ss") : "N/A"
}

/** 用 JS 获取全局 css 变量 */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = ""
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  } catch (error) {
    console.error(error)
  }
  return cssVariableValue
}

/** 用 JS 设置全局 CSS 变量 */
export const setCssVariableValue = (cssVariableName: string, cssVariableValue: string) => {
  try {
    document.documentElement.style.setProperty(cssVariableName, cssVariableValue)
  } catch (error) {
    console.error(error)
  }
}

/** 重置项目配置 */
export const resetConfigLayout = () => {
  removeConfigLayout()
  location.reload()
}

export const getImagebase = (path: string) => {
  return new URL(`${path}`, import.meta.url).href
}

function _random(min: number, max: number) {
  const range = max - min
  const rand = Math.random()
  const num = min + Math.round(rand * range)

  return num
}
export const getRandomColor = () => {
  return "hsl(" + _random(0, 360) + "," + _random(40, 80) + "%," + _random(40, 70) + "%)"
}

export const getCFS = (res: number) => {
  const CWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (!CWidth) return
  const fontSize = CWidth / 1920 // 设计稿的宽度
  return Number((res * fontSize).toFixed(1))
}

export const getDataZoom = (arr: number[], axisArr: number[], isReverse: any, num: number = 7) => {
  isReverse = isReverse ?? false
  let dataZoomVal: any = []
  const numaa = (num / arr?.length) * 100
  if (arr.length <= num + 1) {
    dataZoomVal = []
  } else {
    dataZoomVal = [
      {
        type: "slider",
        yAxisIndex: axisArr,
        zoomLock: true,
        width: 10,
        right: 18,
        top: 25,
        bottom: 40,
        borderColor: "rgba(0,0,0,0)",
        dataBackground: {
          lineStyle: {
            opacity: 0
          },
          areaStyle: {
            opacity: 0
          }
        },

        borderRadius: 15,
        selectedDataBackground: {
          lineStyle: { opacity: 0 }
        },
        start: isReverse ? numaa.toFixed(0) : (100 - numaa).toFixed(0),
        end: isReverse ? 0 : 100,
        minValueSpan: num,
        maxValueSpan: num,
        handleSize: 0,
        showDetail: false,
        backgroundColor: "rgba(244,244,244,.1)",
        textStyle: {
          color: "#FAFAFA",
          fontSize: 12
        },
        labelLeft: 20,
        fillerColor: "#6E9CDA",
        moveHandleSize: 10,
        brushSelect: false,
        showDataShadow: false
      },
      {
        type: "inside",
        id: "insideY",
        yAxisIndex: axisArr,
        start: isReverse ? numaa.toFixed(0) : (100 - numaa).toFixed(0),
        end: isReverse ? 0 : 100,
        filterMode: "empty",
        minValueSpan: num,
        maxValueSpan: num,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true,
        moveHandleSize: 0
      }
    ]
  }
  return dataZoomVal
}
