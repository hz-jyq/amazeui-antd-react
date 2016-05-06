export default function reducer(state = {
  isAuthenticated: false,
  accessToken: localStorage.getItem('accessToken') || '',
  userName: ''
}, action) {
  switch (action.type) {
    default:
      return state
  }
}
