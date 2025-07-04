import type { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...rest }: IProps) => {
  return <input type="text" {...rest} />;
};

export default Input;
