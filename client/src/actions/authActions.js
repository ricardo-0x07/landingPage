
export function login() {
  return {
    type: 'LOGIN'
  }
}

export const getUserInfo = (info) => ({
    type: 'GET_USER_INFO',
    info
});

export function logout() {
  return async (dispatch) => {
    try {
      await localStorage.removeItem('token');

      return dispatch({
        type: 'LOGOUT'
      })
    } catch (error) {
      throw error;
    }
  }
}