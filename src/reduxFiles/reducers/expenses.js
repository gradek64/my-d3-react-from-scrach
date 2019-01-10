// Expenses Reducer

const expensesReducerDefaultState = {
  username:'gregid',
  authorized:true,
};

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
  case 'LOG_IN':
    return [
      ...state,
      action.expense
    ];
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
