import {firebase, googleAuthProvider } from '../firebase/firebase';


const AuthenticatedUser= {
  username:'matt',
  password:'matt',
};


const fakeAuth = {
  isAuthenticated: false,
  authenticate({username,password}={},byProvider){


    switch(byProvider) {
    case 'internal':
      return new Promise((resolve)=>{
        if(username===AuthenticatedUser.username && password===AuthenticatedUser.password)  {

          this.isAuthenticated = true;
          resolve({
            data:{
              username,
              password,
              byProvider
            },
          });

        }
        //not authorized 
        else {
          this.isAuthenticated = false;
          resolve({
            data:{username:null},
          });
        }
      });
    case 'gmail':
      return firebase.auth().signInWithPopup(googleAuthProvider).then((user)=>{
        const { displayName } = user.user;
        return {
          data: {
            username:displayName,
            byProvider}
        };
      });

    default:

    }

    
  },
  signout(fromProvider='internal') {
    this.isAuthenticated = false;

    let loggedOut;
    switch(fromProvider) {
    case 'internal':
      loggedOut = true;
      return loggedOut;  
    case 'gmail':
      console.log('loggedOut from gmail');
      return firebase.auth().signOut();
    default:
    }

    /* setTimeout(()=>{
      return loggedOut;
    },5000);*/
  }
};

export { fakeAuth };