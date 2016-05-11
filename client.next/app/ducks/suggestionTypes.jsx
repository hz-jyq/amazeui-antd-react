import { createAction } from 'redux-actions'


const REQUEST_RECORDS = 'REQUEST_RECORDS'
const DESTROY_RECORD = 'DESTROY_RECORD'

export const requestRecords = createAction(REQUEST_RECORDS)
export const destroyRecord = createAction(DESTROY_RECORD)

export default function reducer(state = {
  loading: true,
  records: []
}, action) {
  switch (action.type) {
    case REQUEST_RECORDS:
      if (action.error) {
        return {
          ...state,
          loading: false
        }
      }

      return {
        ...state,
        loading: false,
        records: action.payload
      }
    case DESTROY_RECORD:
      if (action.error) {
        return {
          ...state
        }
      }

      return {
        ...state,
        records: state.records.filter(r => r.id !== action.payload.id)
      }
    default:
      return state
  }
}
