import { createAction } from 'redux-actions'


const REQUEST_TOKEN = 'REQUEST_TOKEN'
const REFRESH_TOKEN = 'REFRESH_TOKEN'
const CLEANUP_TOKEN = 'CLEANUP_TOKEN'

export const requestToken = createAction(REQUEST_TOKEN)
export const refreshToken = createAction(REFRESH_TOKEN)
export const cleanupToken = createAction(CLEANUP_TOKEN)

export default function reducer(state = {
  isAuthenticated: false,
  accessToken: localStorage.getItem('accessToken') || '',
  userName: '',
  userRole: ''
}, action) {
  switch (action.type) {
    case REQUEST_TOKEN:
    case REFRESH_TOKEN:
      if (action.error) {
        return {
          isAuthenticated: false,
          accessToken: '',
          userName: '',
          userRole: ''
        }
      }

      return {
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        userName: action.payload.user.name,
        userRole: action.payload.user.role
      }
    case CLEANUP_TOKEN:
      return {
        isAuthenticated: false,
        accessToken: '',
        userName: '',
        userRole: ''
      }
    default:
      return state
  }
}
