const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'loggin_seccess':
      return {
        user: action.user
      };
    case 'loggin_failure':
      return {
        user: null
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;