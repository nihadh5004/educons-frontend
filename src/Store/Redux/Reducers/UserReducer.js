

const initialState = {
    username:  '',
    userId :  '',
    role:  '',
    isAuthenticated: false,
  };
 
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_DATA':
        console.log("Setting user:", action.payload);
        return {
          ...state,
          isAuthenticated: true,
          username: action.payload.username,
          role: action.payload.role,
          student: action.payload.student,
          userId : action.payload.userId,
          premium : action.payload.premium,

        };
      case 'UPDATE_PREMIUM':
        console.log('updating');
      return {
        ...state,
        premium: action.payload,
      };
      case 'CLEAR_USER_DATA':
        console.log('clearing')
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          username: '',
          role: '',
        };
      default:
        return state;
    }
  };
  

  