import type { LoginFieldName, RegisterFieldName } from "../types";

export interface IRegisterInput {
    name: RegisterFieldName;
    placeholder: string;
    type: string;
}
export interface ILoginInput {
    name: LoginFieldName;
    placeholder: string;
    type: string;
}

export interface IRegisterValues {
    name: string;
    email: string;
    password: string;
    age: string;
    phone: string;
  }
  

export interface ILoginValues {
    email: string;
    password: string;
  }
  
export interface IErrorResponse  {
    msg: string;
    statusCode:number
}