import cx from "classnames";
import React, { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: React.ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({ children, className, ...props }: ButtonProps) {
  const buttonClassName = cx(
    className,
    "flex flex-row text-white text px-6 py-2 min-w-min justify-center items-center"
  );

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
