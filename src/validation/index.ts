import * as yup from "yup";
import type { IAddNote } from "../interfaces";
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

  /**
 * Validates product data and returns error messages for invalid fields.
 * @param product - The product data to validate. {object}
 * @returns An object containing error messages for each invalid field.
 */
export const noteValidation = (note:IAddNote):IAddNote => {
  const errors:IAddNote = {
    content: "",
    title:"" ,
  } 
  if (note.title.length === 0) {
    errors.title  = "Title is required"
  }
  if (note.content.length === 0) {
    errors.content  = "Content is required"
  }

  return errors;
}