import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const Button = ({ children, ...rest }: Iprops) => {
  return <button {...rest}>{children}</button>;
};

export default Button;
