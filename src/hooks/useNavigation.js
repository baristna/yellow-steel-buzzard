import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { parse } from 'query-string'

export const useNavigation = () => {
  const { search } = useLocation()
  const urlParams = parse(search)
  const navigate = useNavigate()
  const [queryParams, setQueryParams] = useState(urlParams)

  useEffect(() => {
    if (JSON.stringify(urlParams) !== JSON.stringify(queryParams)) {
      setQueryParams(urlParams)
    }
  }, [urlParams])

  const redirect = (params) => {
    let newString = ''

    Object.entries(params).map(([key, values]) => {
      (Array.isArray(values) ? values : [values]).map((value) => {
        newString += `${newString ? '&' : '?'}${key}=${value}`
      })
    })

    navigate({ search: newString })
  }

  const addParams = (params) => {
    const updatedParams = { ...queryParams }

    Object.entries(params).map(([key, values]) => {
      const targetParam =  updatedParams[key]

      if (Array.isArray(targetParam)) {
        updatedParams[key] = [
          ...targetParam,
          ...values,
        ]
      } else {
        updatedParams[key] = values
      }
    })

    setQueryParams(updatedParams)
    redirect(updatedParams)
  }

  const removeParams = (params) => {
    const updatedParams = { ...queryParams }

    Object.entries(params).map(([key, values]) => {
      const targetParam =  Array.isArray(updatedParams[key]) ? updatedParams[key] : [updatedParams[key]]
      const filteredKey = targetParam.filter((k) => !values.includes(k))

      if (filteredKey.length) {
        updatedParams[key] = filteredKey
      } else {
        delete updatedParams[key]
      }
    })
    setQueryParams(updatedParams)
    redirect(updatedParams)
  }

  const setParams = (params) => {
    setQueryParams({
      ...queryParams,
      ...params,
    })
    redirect({
      ...queryParams,
      ...params,
    })
  }

  const updateParams = (action, params) => {
    switch (action.toLowerCase()) {
      case 'add':
        addParams(params)
        break
      case 'remove':
        removeParams(params)
        break
      case 'set':
        setParams(params)
        break
      case 'clear':
        break
      default:
        break
    }
  }

  return {
    search: queryParams,
    setParams: updateParams,
  }
}
