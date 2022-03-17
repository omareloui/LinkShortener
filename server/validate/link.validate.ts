import * as yup from "yup";

export const linkSchema = yup.object().shape({
  url: yup.string().trim().url().required(),
  slug: yup.string().trim(),
});
