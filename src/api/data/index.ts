import { request } from "@/utils/service"

/** 查 */
export function getMainDataApi() {
  return request({
    url: "/index",
    method: "get"
  })
}

/** 查 */
export function getMainDataInfoApi(data: number) {
  return request({
    url: "/index/main",
    method: "get",
    data
  })
}

/** 查 */
export function getDeliveryDataApi() {
  return request({
    url: "/delivery",
    method: "get"
  })
}

/** 查 */
export function getOrderDataApi(data: object) {
  console.log(data, "999999999999")

  return request({
    url: "/order",
    method: "get",
    ...data
  })
}

/** 查 */
export function getAllRegionDataApi(data: object) {
  return request({
    url: "/order/getAllRegion",
    method: "get",
    ...data
  })
}

/** 查 */
export function getOrderDeliveryDataApi(data: any) {
  return request({
    url: "/order/orderDelivery",
    method: "get",
    ...data
  })
}

/** 查 */
export function saveExpressValueInfoDataApi(data: any) {
  return request({
    url: "/order/saveExpressValueInfo",
    method: "post",
    data
  })
}

/** 查 */
export function getOrderpackDataApi(data: any) {
  return request({
    url: "/order/orderpack",
    method: "get",
    ...data
  })
}

/** 查 */
export function saveRemarkInfoDataApi(data: any) {
  return request({
    url: "/order/saveRemarkInfo",
    method: "post",
    data
  })
}

/** 查 */
export function savePrintInfoDataApi(data: any) {
  return request({
    url: "/order/savePrintInfo",
    method: "post",
    data
  })
}

/** 查 */
export function saveAdminMemoDataApi(data: any) {
  return request({
    url: "/order/saveAdminMemo",
    method: "post",
    data
  })
}

/** 查 */
export function destoryDataApi(data: any) {
  return request({
    url: "/order/destory",
    method: "post",
    data
  })
}

/** 查 */
export function rePrintExpressDataApi(data: any) {
  return request({
    url: "/order/rePrintExpress",
    method: "get",
    ...data
  })
}

/** 查 */
export function directPrintExpressDataApi(data: any) {
  return request({
    url: "/order/directPrintExpress",
    method: "get",
    ...data
  })
}

/** 查 */
export function checkExpressDataApi(data: any) {
  return request({
    url: "/order/checkExpress",
    method: "get",
    ...data
  })
}

/** 查 */
export function getOrderReceiveDataApi(data: any) {
  return request({
    url: "/order/orderReceive",
    method: "get",
    ...data
  })
}

/** 查 */
export function getMianExpressDataApi(data: any) {
  return request({
    url: "/order/getMianExpress",
    method: "post",
    data
  })
}

/** 查 */
export function getGoDeliveryDataApi(data: any) {
  return request({
    url: "/order/goDelivery",
    method: "post",
    data
  })
}

/** 查 */
export function getGoPrintOnlyDataApi(data: any) {
  return request({
    url: "/order/goPrintOnly",
    method: "post",
    data
  })
}

/** 查 */
export function getOrderPriceDataApi(data: any) {
  return request({
    url: "/order/orderPrice",
    method: "get",
    ...data
  })
}

/** 查 */
export function getAutoStatusDataApi() {
  return request({
    url: "/order/getAutoStatus",
    method: "get"
  })
}

/** 查 */
export function getOrderDetailDataApi(data: any) {
  return request({
    url: "/order/detail",
    method: "get",
    ...data
  })
}

/** 查 */
export function saveAddressDataApi(data: any) {
  return request({
    url: "/order/saveAddress",
    method: "post",
    ...data
  })
}

/** 查 */
export function changeStatusApi(data: any) {
  return request({
    url: "/order/changeStatus",
    method: "post",
    ...data
  })
}

/** 查 */
export function getOrderExpressApi(data: any) {
  return request({
    url: "/order/getOrderExpress",
    method: "post",
    ...data
  })
}

export function goodsListDeleteApi(data: any) {
  return request({
    url: "/order/goodsListDelete",
    method: "post",
    ...data
  })
}

export function saveGoodsListApi(data: any) {
  return request({
    url: "/order/saveGoodsList",
    method: "post",
    ...data
  })
}
