import type { ReactNode } from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  msg: string;
}

const ErrorMessage = ({ icon, msg, ...rest }: IProps) => {
  return (
    <div {...rest}>
      <div className="w-6 h-6 flex-shrink-0">{icon}</div>
      <h3 className="text-base font-medium">{msg}</h3>
    </div>
  );
};

export default ErrorMessage;
