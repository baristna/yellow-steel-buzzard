import React, { useState, useContext, useEffect } from 'react'
import { DatePicker as AntDatePicker } from 'antd'
import moment from 'moment'
import { useNavigation } from '../../hooks'
import { Context } from '../../store'
import { formatDate } from '../../utils'

const { RangePicker } = AntDatePicker

const dateFormat = 'MMM Do, YYYY'

export const DatePicker = () => {
  const { search, setParams } = useNavigation()
  const [state, dispatch] = useContext(Context)
  const [dates, setDates] = useState([])
  const [hackValue, setHackValue] = useState()
  const [value, setValue] = useState()

  useEffect(() => {
    // bug: 3 months max range can be exceeded with direct value
    dispatch({ type: 'SET_DATE_RANGE',
      payload: {
        start: formatDate(
          search.start ?
            moment(search.start) :
            moment().subtract(7, 'days')
        ),
        end: formatDate(
          search.end ?
            moment(search.end) :
            moment()
        ),
      },
    })
  }, [])

  useEffect(() => {
    const { start, end } = state.dateRange

    setValue([
      moment(start),
      moment(end),
    ])

    setParams('SET', { start, end })
  }, [state.dateRange])

  const disabledDate = (current) => {
    const isFuture = current && current.valueOf() > moment()

    if (!dates || dates.length === 0) {
      return isFuture
    }

    const tooLate = dates[0] && current.diff(dates[0], 'months') >= 3
    const tooEarly = dates[1] && dates[1].diff(current, 'months') >= 3

    return isFuture || tooEarly || tooLate
  }

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([])
      setDates([])
    } else {
      setHackValue(undefined)
    }
  }

  const onChangeHandler = (val) => {
    dispatch({ type: 'SET_DATE_RANGE',
      payload: {
        start: formatDate(val[0]),
        end: formatDate(val[1]),
      } })
  }

  return (
    <RangePicker
      value={hackValue || value}
      size='large'
      format={dateFormat}
      onChange={onChangeHandler}
      onCalendarChange={(val) => setDates(val)}
      disabledDate={disabledDate}
      onOpenChange={onOpenChange}
      inputReadOnly
    />
  )
}
