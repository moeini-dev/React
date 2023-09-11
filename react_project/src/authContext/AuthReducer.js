const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'loggin_seccess':
      return {
        user: action.user,
        error: null
      };
    case 'loggin_failure':
      return {
        user: null,
        error: action.error
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;