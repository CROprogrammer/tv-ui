import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import Header from "../components/Header";
import cx from "classnames";

type ContentProps = {
  children: React.ReactNode;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function ContentWrapper({
  children,
  className,
  ...props
}: ContentProps) {
  const contentWrapperClassName = cx(className, "h-full w-full");

  return (
    <div className={contentWrapperClassName} {...props}>
      <Header />
      {children}
    </div>
  );
}
