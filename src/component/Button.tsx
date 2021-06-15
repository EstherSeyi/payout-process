import { ReactNode } from "react";

type ButtonProp = {
  children?: ReactNode;
  label?: string;
  styleClasses?: string;
};

const Button = ({ children, label, styleClasses = "" }: ButtonProp) => {
  return (
    <button
      className={`px-.5 py-2  w-full rounded text-xs sm:text-sm font-bold ${styleClasses}`}
    >
      {children || label}
    </button>
  );
};

export default Button;
