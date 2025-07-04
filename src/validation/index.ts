import * as yup from "yup";
export const registerSchema = yup
  .object({
    name: yup
      .string()
      .required("name is required")
      .min(5, "name should be at least 5 charachters"),
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be at least 6 charachters."),
    age:yup.number()
    .positive("Please enter a positive number")
    .integer("Please enter a valid number")
    .required("Age is required"),
    phone: yup
    .string()
    .matches(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number")
    .required("Phone number is required"),

  })
  .required();
export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be at least 6 charachters."),
  })
  .required();
