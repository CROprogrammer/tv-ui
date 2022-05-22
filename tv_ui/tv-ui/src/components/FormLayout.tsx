import React from "react";

import cx from "classnames";
import { Formik, FormikConfig, Form } from "formik";

type FormLayoutProps<Values> = FormikConfig<Values> & {
  className?: string;
};

export default function FormLayout<Values>({
  onSubmit,
  children,
  initialValues,
  validationSchema,
  className,
}: FormLayoutProps<Values>) {
  const formLayoutClassName = cx(className, "flex flex-col");

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      <Form className={formLayoutClassName}>{children as React.ReactNode}</Form>
    </Formik>
  );
}
