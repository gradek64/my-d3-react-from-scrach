// Expenses Reducer

//check if locals torage user is set and get its name;
const localstoredUserName = localStorage.getItem('usernameAuth');
//const localstoredUserName = document.cookie = "usernameAuth=John Doe";
const credentials = {
  username:localstoredUserName?localstoredUserName:undefined,
  autohorizedBy:'internal'
};

export default (state = credentials, action) => {
  switch (action.type) {

  case 'LOG_IN':
    return {
      ...state,
      ...action.user
    };
  case 'LOG_OUT':
    localStorage.removeItem('usernameAuth');

    return {
      ...state,
      username: undefined
    };
  case 'EDIT_EXPENSE':
    return state.map((expense) => {
      if (expense.id === action.id) {
        return {
          ...expense,
          ...action.updates
        };
      } else {
        return expense;
      }
    });
  default:
    return state;
  }
};
