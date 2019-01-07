import Schema from 'validate';

const validationRules = {
  filename: new Schema({
    filename: {
      required: true,
      length: { min: 3, max: 32 }
    },
  }),
  username: new Schema({
    username: {
      required: true,
      length: { min: 3, max: 32 }
    },
  }),
  email: new Schema({
    email: {
      type: String,
      match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      required: true,
      message: 'Email is invalid'
    },
  }),
  select: new Schema({ 
    select: {
      required: true,
    }
  }),
};

export {validationRules};