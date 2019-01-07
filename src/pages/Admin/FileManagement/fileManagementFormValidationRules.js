import Schema from 'validate';

const validationRules = {
  uploadfiled: new Schema({
    uploadfiled: {
      required: true,
    },
  }),
  select: new Schema({ 
    select: {
      required: true,
    }
  }),
};

export {validationRules};