const AuthenticatedUser= {
  username:'matt',
  password:'matt',
};


const fakeAuth = {
  isAuthenticated: false,
  authenticate({username,password}){

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
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export { fakeAuth };