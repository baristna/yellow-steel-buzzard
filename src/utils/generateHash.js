import hash from 'object-hash'

export const generateHash = (props) => `chart-${hash(props)}`
