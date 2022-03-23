import * as yup from "yup";

export const linkSchema = yup.object().shape({
  url: yup.string().url().required().trim(),
  slug: yup
    .string()
    .matches(
      /^[a-z0-9\-_]+$/,
      'The slug can only include lower case letters, numbers, "-" or "_"'
    )
    .required()
    .trim()
    .lowercase(),
});
