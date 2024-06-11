<template>
  <div class="pageContenter">
    <PageFrame :defisblock="true" defBlockName="sun-chart" :componentList="chartList" />
  </div>
</template>

<script setup>
import PageFrame from "@/components/pageFrame/index.vue"
import MapChart from "./mapChart/index.vue"
// import mapData from "./result.json"

const chartList = [
  {
    id: "sun-chart",
    renderCompoment: MapChart
  }
]

// function convert2Echarts(json) {
//   let results = ""

//   json.UTF8Encoding = true

//   const features = json.features

//   if (!features) {
//     return
//   }

//   features.forEach(function (feature) {
//     const encodeOffsets = (feature.geometry.encodeOffsets = [])

//     const coordinates = feature.geometry.coordinates

//     if (feature.geometry.type === "Polygon") {
//       coordinates.forEach(function (coordinate, idx) {
//         coordinates[idx] = encodePolygon(coordinate, (encodeOffsets[idx] = []))
//       })
//     } else if (feature.geometry.type === "MultiPolygon") {
//       coordinates.forEach(function (polygon, idx1) {
//         encodeOffsets[idx1] = []

//         polygon.forEach(function (coordinate, idx2) {
//           coordinates[idx1][idx2] = encodePolygon(coordinate, (encodeOffsets[idx1][idx2] = []))
//         })
//       })
//     } else if (feature.geometry.type === "MultiLineString") {
//       coordinates.forEach(function (coordinate, idx) {
//         coordinates[idx] = encodePolygon(coordinate, (encodeOffsets[idx] = []))
//       })
//     }
//   })

//   results = JSON.stringify(json)

//   return results
// }

// function encodePolygon(coordinate, encodeOffsets) {
//   let result = ""

//   let prevX = quantize(coordinate[0][0])

//   let prevY = quantize(coordinate[0][1])

//   // Store the origin offset

//   encodeOffsets[0] = prevX

//   encodeOffsets[1] = prevY

//   for (let i = 0; i < coordinate.length; i++) {
//     const point = coordinate[i]

//     result += encode(point[0], prevX)

//     result += encode(point[1], prevY)

//     prevX = quantize(point[0])

//     prevY = quantize(point[1])
//   }

//   return result
// }

// function encode(val, prev) {
//   // Quantization

//   val = quantize(val)

//   // var tmp = val;

//   // Delta

//   val = val - prev

//   if (((val << 1) ^ (val >> 15)) + 64 === 8232) {
//     //WTF, 8232 will get syntax error in js code

//     val--
//   }

//   // ZigZag

//   val = (val << 1) ^ (val >> 15)

//   // add offset and get unicode

//   return String.fromCharCode(val + 64)

//   // var tmp = {'tmp' : str};

//   // try{

//   //   eval("(" + JSON.stringify(tmp) + ")");

//   // }catch(e) {

//   //   console.log(val + 64);

//   // }
// }

// function quantize(val) {
//   return Math.ceil(val * 1024)
// }

// const handleHistory = () => {
//   const zip = convert2Echarts(mapData)

//   console.log(zip)
// }
</script>

<style lang="scss" scoped>
.pageContenter {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>
