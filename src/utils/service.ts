import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios"
import { useUserStoreHook } from "@/store/modules/user"
import { ElMessage } from "element-plus"
import { get, merge } from "lodash-es"
import { getToken } from "./cache/cookies"

const CancelToken = axios.CancelToken

type paramsProps = {
  [key: string]: any // 属性名为 string 类型，属性值为 any 类型
}

interface InternalAxiosRequestConfigEX extends InternalAxiosRequestConfig {
  apiKey?: string
}

interface AxiosResponseEX extends AxiosResponse {
  config: InternalAxiosRequestConfigEX
}

const cancelSource: paramsProps = {}
/** 退出登录并强制刷新页面（会重定向到登录页） */
function logout() {
  useUserStoreHook().logout()
  location.reload()
}

/**
 * 格式化参数
 */
function transformRequest(data: any) {
  const formatParams = {
    lang: "en",
    ...data
  }
  return JSON.stringify(formatParams)
}

/** 创建请求实例 */
function createService() {
  // 创建一个 axios 实例命名为 service
  const service = axios.create({
    baseURL: "/admin",
    // withCredentials: true,  // 跨域请求时是否需要使用凭证
    timeout: 600000, // 默认超时时间10分钟
    transformRequest: [transformRequest]
    // transformRequest: [this.transformRequest],
    // transformResponse: [transformResponse]
    // transformResponse: [this.transformResponse],
  })
  // 请求拦截
  service.interceptors.request.use(
    (config: InternalAxiosRequestConfigEX) => {
      console.log(config)

      const { apiKey } = config
      if (apiKey) {
        config.cancelToken = new CancelToken((cancel) => {
          if (cancelSource[apiKey]) {
            cancelSource[apiKey](`取消接口${apiKey}`)
            delete cancelSource[apiKey]
            cancelSource[apiKey] = cancel
          } else {
            cancelSource[apiKey] = cancel
          }
        })
      }
      return config
    },
    // 发送失败
    (error) => Promise.reject(error)
  )
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response: AxiosResponseEX) => {
      const { apiKey } = response.config
      if (apiKey) {
        delete cancelSource[apiKey]
      }
      // apiData 是 api 返回的数据
      const apiData = response.data
      // 二进制数据则直接返回
      const responseType = response.request?.responseType
      if (responseType === "blob" || responseType === "arraybuffer") return apiData
      // 这个 code 是和后端约定的业务 code
      const code = apiData.errno
      // 如果没有 code, 代表这不是项目后端开发的 api
      if (code === undefined) {
        ElMessage.error("非本系统的接口")
        return Promise.reject(new Error("非本系统的接口"))
      }
      switch (code) {
        case 0:
          // 本系统采用 code === 0 来表示没有业务错误
          return apiData
        // case 401:
        // Token 过期时
        // return logout()
        default:
          // 不是正确的 code
          ElMessage.error(apiData.message || "Error")
          return Promise.reject(new Error("Error"))
      }
    },
    (error) => {
      if (axios.isCancel(error)) {
        throw new axios.Cancel("cancel request")
      }
      // status 是 HTTP 状态码
      const status = get(error, "response.status")
      switch (status) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          // Token 过期时
          logout()
          break
        case 403:
          error.message = "拒绝访问"
          break
        case 404:
          error.message = "请求地址出错"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = "服务器内部错误"
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          break
        case 505:
          error.message = "HTTP 版本不受支持"
          break
        default:
          break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

/** 创建请求方法 */
function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosResponseEX): Promise<T> {
    const token = getToken()
    const defaultConfig = {
      headers: {
        // 携带 Token
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json"
      },
      timeout: 60000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: service
    }
    // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    const mergeConfig = merge(defaultConfig, config)

    return service(mergeConfig)
  }
}

/** 用于网络请求的实例 */
const service = createService()
/** 用于网络请求的方法 */
export const request = createRequest(service)
