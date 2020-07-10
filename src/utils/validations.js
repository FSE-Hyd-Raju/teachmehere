import * as yup from 'yup';

const postStep1ValidationSchema = yup.object({
  skillName: yup
    .string()
    .required()
    .min(4),
  skillLevel: yup.string().required(),
  totalHours: yup
    .number()
    .required()
    .min(1),
});

const postStep2ValidationSchema = yup.object({
  country: yup.string().required(),
  individualPrice: yup
    .number()
    .required()
    .min(1),
  noOfPeople: yup.number().min(1),
  groupPrice: yup.number().min(1),
  languages: yup.array().required(),
});

export { postStep1ValidationSchema, postStep2ValidationSchema };
