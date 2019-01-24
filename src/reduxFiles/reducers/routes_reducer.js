export default (state = {}, action) => {
  switch (action.type) {
  case 'ROUTE_CHANGE':
    return {};
  default:
    return state;
  }
};
