import Schema from 'validate';

const validationRules = {
  costModelName: new Schema({
    costModelName: {
      required: true,
      message: 'CostModel Name is required.',
    },
  }),
};

export { validationRules };
