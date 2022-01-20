import React, { createContext, useReducer } from 'react'
import { combineReducers } from './utils'
import {
  dateRangeReducer,
  initialState,
} from './reducers'

const rootReducer = combineReducers({
  dateRange: dateRangeReducer,
})

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState )

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
}

export const Context = createContext({ initialState })

export default Store
