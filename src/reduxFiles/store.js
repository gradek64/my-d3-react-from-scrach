import { createStore, combineReducers, applyMiddleware } from 'redux';
//reducers
import authReducer from './reducers/auth_reducer';
import thunk from 'redux-thunk';

export default () => {
  const store = createStore(
    combineReducers({
      user: authReducer,
    }),
    applyMiddleware(thunk)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
