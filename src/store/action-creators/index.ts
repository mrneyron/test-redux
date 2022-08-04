import * as FilterActionCreators from './filter'
import * as ResultActionCreators from './result'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...ResultActionCreators,
  ...FilterActionCreators
}
