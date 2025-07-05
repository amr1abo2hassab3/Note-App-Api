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
    statusCode: number;
}

export interface IAuthContextValue {
  setToken: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  userData: IUserData;
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
  setNotesCount: React.Dispatch<React.SetStateAction<number>>;
  notesCount: number;
}

export interface IUserData  {
  email: string;
  exp: number;
  iat: number;
  id: string
}

export interface INote {
  _id: string
  title: string
  content: string
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
}
export interface IAddNote {
  title: string
  content: string
}

