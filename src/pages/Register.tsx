import { useFormik } from "formik";
import Input from "../Components/ui/Input";
import type {
  IErrorResponse,
  IRegisterInput,
  IRegisterValues,
} from "../interfaces";
import { REGISTER_FORM } from "../data";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios.config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../Components/ui/Button";
import InputErrorMessage from "../Components/ui/InputErrorMessage";
import { registerSchema } from "../validation";
import type { AxiosError } from "axios";

const Register = () => {
  // states or hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const initialValues: IRegisterValues = {
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
  };

  // handler
  const onSubmit = async (values: IRegisterValues) => {
    setIsLoading(true);
    try {
      const { status } = await toast.promise(
        axiosInstance.post("users/signUp", values),
        {
          loading: "Sending data ..... ",
          success:
            "You will navigate to the login page after 2 seconds to login.",
          error: "Error when fetching",
        },
        {
          position: "top-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        }
      );
      if (status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data?.msg}`, {
        position: "top-right",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const { errors, values, handleChange, handleSubmit, handleBlur, touched } =
    useFormik<IRegisterValues>({
      initialValues,
      onSubmit,
      validationSchema: registerSchema,
    });

  // render
  const renderInputs = REGISTER_FORM.map(
    (input: IRegisterInput, index: number) => (
      <div key={index} className="space-y-1">
        <label
          htmlFor={input.name}
          className="text-gray-700 font-medium text-sm"
        >
          {input.placeholder}
        </label>
        <Input
          type={input.type}
          name={input.name}
          id={input.name}
          placeholder={input.placeholder}
          value={values[input.name]}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border border-gray-300 shadow-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none rounded-lg px-4 py-3 text-base w-full transition"
        />
        {touched[input.name] && errors[input.name] && (
          <InputErrorMessage msg={errors[input.name]} />
        )}
      </div>
    )
  );

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-2xl space-y-6">
      <h2 className="text-center text-3xl font-bold text-indigo-700">
        Register to get access!
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {renderInputs}

        <Button
          disabled={isLoading}
          type="submit"
          className="py-3 duration-200 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center w-full px-4 font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition "
        >
          {isLoading ? (
            <svg
              className="w-5 h-5 animate-spin text-white"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Register;
