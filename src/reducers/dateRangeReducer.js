export const initialState = {
  start: null,
  end: null,
}

export const dateRangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATE_RANGE':
      return {
        ...state,
        ...action.payload,
      }
    default: return state
  }
}
