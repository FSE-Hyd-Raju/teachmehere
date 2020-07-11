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
  languages: yup.array().defined(),
});

const postStep4ValidationSchema = yup.object({
  platform: yup.string().required(),
  //tags: yup.string().test(),
  experience: yup.number().min(1),
  profileSummary: yup.string(),
  linkedInProfile: yup
    .string()
    .matches(
      /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!',
    )
    .required('Enter correct url!'),
});

export {
  postStep1ValidationSchema,
  postStep2ValidationSchema,
  postStep4ValidationSchema,
};
