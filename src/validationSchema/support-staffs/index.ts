import * as yup from 'yup';

export const supportStaffValidationSchema = yup.object().shape({
  specialty: yup.string().nullable(),
  experience_years: yup.number().integer().nullable(),
  user_id: yup.string().nullable().required(),
});
