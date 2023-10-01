import * as yup from 'yup';

export const customerValidationSchema = yup.object().shape({
  company_name: yup.string().nullable(),
  contact_number: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
