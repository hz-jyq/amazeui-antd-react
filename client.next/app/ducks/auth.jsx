import { createAction } from 'redux-actions'


const REQUEST_TOKEN = 'REQUEST_TOKEN'
const REFRESH_TOKEN = 'REFRESH_TOKEN'
const CLEANUP_TOKEN = 'CLEANUP_TOKEN'

export const requestToken = createAction(REQUEST_TOKEN)
export const refreshToken = createAction(REFRESH_TOKEN)
export const cleanupToken = createAction(CLEANUP_TOKEN)

export default function reducer(state = {
  isAuthenticated: false,
  accessToken: localStorage.getItem('accessToken') || ''
}, action) {
  switch (action.type) {
    case REQUEST_TOKEN:
    case REFRESH_TOKEN:
      if (action.error) {
        return {
          isAuthenticated: false,
          accessToken: ''
        }
      }

      return {
        isAuthenticated: true,
        accessToken: action.payload.accessToken
      }
    case CLEANUP_TOKEN:
      return {
        isAuthenticated: false,
        accessToken: ''
      }
    default:
      return state
  }
}
