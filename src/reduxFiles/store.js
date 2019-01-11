import { createStore, combineReducers } from 'redux';
//reducers
import authReducer from './reducers/auth_reducer';

export default () => {
  const store = createStore(
    combineReducers({
      user: authReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
