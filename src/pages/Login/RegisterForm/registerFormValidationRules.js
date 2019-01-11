import Schema from 'validate';

const validationRules = {
  username: new Schema({
    username: {
      required: true,
    },
  }),
  password: new Schema({ 
    password: {
      required: true,
    }
  }),
  email: new Schema({ 
    email: {
      required: true,
    }
  }),
  favoritePet: new Schema({ 
    favoritePet: {
      required: true,
    }
  }),
  favoriteFood: new Schema({ 
    favoriteFood: {
      required: true,
    }
  }),
};

export {validationRules};