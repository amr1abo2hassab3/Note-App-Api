import type { ILoginInput, IRegisterInput } from "../interfaces";

export const REGISTER_FORM: IRegisterInput[] = [
    {
        name: "name",
        placeholder: "Enter Your Name", 
        type:"text"
    } ,
    {
        name: "email",
        placeholder: "Enter Your Email", 
        type:"email"
    } ,
    {
        name: "age",
        placeholder: "Enter Your Age", 
        type:"number"
    } ,
    {
        name: "phone",
        placeholder: "Enter Your Phone", 
        type:"text"
    } ,
    {
        name: "password",
        placeholder: "Enter Your Password", 
        type:"password"
    } ,
]
export const LOGIN_FORM: ILoginInput[] = [
    {
        name: "email",
        placeholder: "Enter Your Email", 
        type:"email"
    },
    {
        name: "password",
        placeholder: "Enter Your Password", 
        type:"password"
    } ,
]