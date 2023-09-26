export const setUserData = (userData) => ({
    type: 'SET_USER_DATA',
    payload: userData,
  });
  
export const clearUserData = () => ({
    type: 'CLEAR_USER_DATA',
  });