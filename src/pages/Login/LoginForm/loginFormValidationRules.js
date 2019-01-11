import Schema from 'validate';

const validationRules = {
  username: new Schema({
    username: {
      required: true,
      length: { min: 3, max: 32 }
    },
  }),
  password: new Schema({ 
    password: {
      required: true,
    }
  })
};

export {validationRules};