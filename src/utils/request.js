import axios from 'axios'
import { env, requestDefaults } from '../config'

const request = axios.create({
  baseURL: env.apiBase,
  headers: { 'Content-Type': 'application/json' },
})

request.interceptors.request.use((config) => {
  const { timeParams, distParams } = requestDefaults

  config.data = {
    ...(config.data.group ? distParams : timeParams),
    ...config.data,
  }

  delete config.data.group

  return { ...config }
})

export { request }
