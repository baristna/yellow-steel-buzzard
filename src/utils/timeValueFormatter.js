import moment from 'moment'
import 'moment-duration-format'

export const timeValueFormatter = function () {
  return moment.duration(parseInt(this.value || this.y)).format('HH:mm:ss')
}
