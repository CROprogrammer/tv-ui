import React, { DetailedHTMLProps, HTMLAttributes, useState } from "react";

import { ErrorMessage, Field, FormikHelpers } from "formik";

import cx from "classnames";

import * as Yup from "yup";
import * as categoriesApi from "../../../api/categories";

import FormLayout from "../../../components/FormLayout";
import Button from "../../../components/Button";
import { NewCategoryFormData } from "../models/category";
import { makeToast } from "../../../utils/makeToast";

type NewCategoryFormProps = {
  hideNewCategoryForm: () => void;
  numOfCategories: number;
  setNumOfCategories: (numOfCategories: number) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const newCategoryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(255, "Upisani naziv je predugačak")
    .required("Potrebno je upisati naziv kategorije"),
  description: Yup.string().required("Potrebno je upisati opis kategorije"),
});

export default function NewCategoryForm({
  hideNewCategoryForm,
  className,
  numOfCategories,
  setNumOfCategories,
}: NewCategoryFormProps) {
  const [newCategoryCreationError, setNewCategoryCreationError] =
    useState<string>("");

  const newCategoryFormClassname = cx(
    "flex flex-row items-center px-4 pt-2",
    className
  );

  const onSubmitAddNewCategory = async (
    newCategoryData: NewCategoryFormData,
    formikHelpers: FormikHelpers<NewCategoryFormData>
  ) => {
    formikHelpers.setSubmitting(true);
    const response = await categoriesApi.createNewCategory(newCategoryData);
    if (response.status !== 201) {
      setNewCategoryCreationError(
        "Neuspješna izrada kategorije. Kategorije s upisanim imenom već postoji."
      );
    } else {
      setNewCategoryCreationError("");
      setNumOfCategories(numOfCategories + 1);
      makeToast("Nova kategorija uspješno dodana.");
    }
    formikHelpers.setSubmitting(false);
  };

  return (
    <FormLayout
      initialValues={{ name: "", description: "" } as NewCategoryFormData}
      onSubmit={(values: NewCategoryFormData, formikHelpers) =>
        onSubmitAddNewCategory(values, formikHelpers)
      }
      validationSchema={newCategoryValidationSchema}
    >
      <tr className={newCategoryFormClassname}>
        <td className="pr-1">
          <Field
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500
                  focus:border-sky-500 focus:z-10 sm:text-sm"
            placeholder="Naziv kategorije"
          />
          <div className="text-red-600">
            <ErrorMessage name="name" />
          </div>
        </td>
        <td className="px-1">
          <Field
            id="description"
            name="description"
            type="text"
            autoComplete="description"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500
                  focus:border-sky-500 focus:z-10 sm:text-sm"
            placeholder="Opis kategorije"
          />
          <div className="text-red-600">
            <ErrorMessage name="description" />
          </div>
        </td>
        <td className="pl-3 pr-1">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm
                font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-sky-500"
          >
            Dodaj novu kategoriju
          </button>
        </td>
        <td className="pl-1">
          <Button
            className="bg-red-500 rounded-md"
            onClick={hideNewCategoryForm}
          >
            Odustani
          </Button>
        </td>
      </tr>
      <div className="pl-4 pb-2 text-red-600">
        {newCategoryCreationError ?? ""}
      </div>
    </FormLayout>
  );
}
