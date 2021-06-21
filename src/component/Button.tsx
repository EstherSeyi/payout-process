import { ReactNode, MouseEventHandler } from "react";

type ButtonProp = {
  children?: ReactNode;
  label?: string;
  styleClasses?: string;
  type?: "submit" | "button" | "reset" | undefined;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  children,
  label,
  styleClasses = "",
  type = "button",
  disabled = false,
  onClick,
}: ButtonProp) => {
  return (
    <button
      data-testid="button"
      type={type}
      className={`px-.5 py-2  w-full rounded text-xs sm:text-sm font-bold focus:outline-none ${styleClasses} ${
        disabled ? "cursor-not-allowed" : ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children || label}
    </button>
  );
};

export default Button;
