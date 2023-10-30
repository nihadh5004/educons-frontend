export const setUserData = (userData) => ({
    type: 'SET_USER_DATA',
    payload: userData,
  });
  
export const clearUserData = () => ({
    type: 'CLEAR_USER_DATA',
  });

  export const updatePremium = (status) => ({
    type: 'UPDATE_PREMIUM',
    payload: status,
  });
  export const updateUsername = (status) => ({
    type: 'UPDATE_USERNAME',
    payload: status,
  });