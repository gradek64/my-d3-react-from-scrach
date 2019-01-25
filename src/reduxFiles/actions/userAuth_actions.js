import {firebase, googleAuthProvider } from '../../firebase/firebase';

// Log in user
export const logUser = (username,byProvider) => {
  console.log('username', username);
  console.log('redux byProvider', byProvider);
  return {
    type: 'LOG_IN',
    user:{ username, byProvider }
  };};

// Log out user no paylod needed;
export const logOutUser = () => ({ type: 'LOG_OUT' });

// autohoriztion by gmail google
//this needs to return a function so it needs thunk middleware fore redux store
export const logUserByGoogle = () => 
  ()=>{
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };

//this needs to return a function so it needs thunk middleware fore redux store
export const logOutByGoogle = () => 
  ()=>{
    return firebase.auth().signOut();
  };
