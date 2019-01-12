
// Log in user
export const logUser = (username
) => ({
  type: 'LOG_IN',
  user:{username}
});

// Log out user no paylod needed;
export const logOutUser = () => ({ type: 'LOG_OUT'});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
