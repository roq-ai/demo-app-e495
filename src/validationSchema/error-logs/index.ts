import * as yup from 'yup';

export const errorLogValidationSchema = yup.object().shape({
  error_message: yup.string().required(),
  error_code: yup.number().integer().required(),
  occurred_at: yup.date().required(),
  resolved_at: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
