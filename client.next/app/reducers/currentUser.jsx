import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from '../actions/currentUser'


export function currentUser(state = {
  isAuthenticated: Boolean(localStorage.getItem('user.token'))
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isAuthenticated: false
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false
      })
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {})
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false
      })
    case LOGOUT_FAILURE:
      return Object.assign({}, state, {})
    default:
      return state
  }
}
