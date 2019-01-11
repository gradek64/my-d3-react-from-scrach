// Expenses Reducer

//check if locals torage user is set and get its name;
const localstoredUserName = localStorage.getItem('usernameAuth');
const credentials = {
  username:localstoredUserName?localstoredUserName:'',
};

export default (state = credentials, action) => {
  switch (action.type) {

  case 'LOG_IN':
    console.log('action.username',action.user);
    return {
      ...state,
      ...action.user
    };
  case 'REMOVE_EXPENSE':
    return state.filter(({ id }) => id !== action.id);
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
