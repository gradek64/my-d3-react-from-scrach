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
            data:AuthenticatedUser,
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
          data: {username:displayName}
        };
      });

    default:

    }

    
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export { fakeAuth };