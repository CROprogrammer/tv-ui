import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";

import { ErrorMessage, Field, FormikHelpers } from "formik";

import cx from "classnames";

import * as Yup from "yup";
import * as contentApi from "../../../api/contents";

import FormLayout from "../../../components/FormLayout";
import Button from "../../../components/Button";
import { NewContentFormData } from "../models/channel/content";
import { Category } from "../../categories/models/category";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";
import { categoriesAction } from "../../categories/store/CategoriesSlice";
import { makeToast } from "../../../utils/makeToast";

type NewChannelFormProps = {
  channelId: string;
  hideNewContentForm: () => void;
  numOfContent: number;
  setNumOfContent: (numOfContent: number) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const newContentValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(255, "Upisani naziv je predugačak")
    .required("Potrebno je upisati naziv kanala"),
  description: Yup.string().required("Potrebno je upisati opis kanala"),
  startTime: Yup.string().required(
    "Potrebno je upisati vrijeme početka sadržaja"
  ),
  endTime: Yup.string().required("Potrebno je upisati vrijeme završetka"),
  category: Yup.string().required("Potrebno je odabrati kategoriju sadržaja"),
});

export default function NewContentForm({
  channelId,
  hideNewContentForm,
  className,
  numOfContent,
  setNumOfContent,
}: NewChannelFormProps) {
  const [newContentCreationError, setNewContentCreationError] =
    useState<string>("");
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  useEffect(() => {
    // @ts-ignore
    dispatch(categoriesAction.getCategories(null));
  }, [dispatch]);

  const newContentFormClassname = cx(
    "flex flex-row items-center px-4 pt-2",
    className
  );

  const onSubmitAddNewContent = async (
    newContentData: NewContentFormData,
    formikHelpers: FormikHelpers<NewContentFormData>
  ) => {
    formikHelpers.setSubmitting(true);
    const response = await contentApi.createContent(newContentData, channelId);
    if (response.status !== 201) {
      setNewContentCreationError("Neuspješna izrada sadržaja.");
    } else {
      setNewContentCreationError("");
      setNumOfContent(numOfContent + 1);
      makeToast("Uspješno dodan sadržaj kanalu.");
    }
    formikHelpers.setSubmitting(false);
  };

  return (
    <FormLayout
      initialValues={
        {
          name: "",
          description: "",
          startTime: "",
          endTime: "",
          category: "default",
        } as NewContentFormData
      }
      onSubmit={(values: NewContentFormData, formikHelpers) =>
        onSubmitAddNewContent(values, formikHelpers)
      }
      validationSchema={newContentValidationSchema}
    >
      <tr className={newContentFormClassname}>
        <th
          scope="row"
          className="font-medium text-gray-900 dark:text-white whitespace-nowrap"
        ></th>
        <td className="pl-2">
          <Field
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500
                  focus:border-sky-500 focus:z-10 sm:text-sm"
            placeholder="Naziv sadržaja"
          />
          <div className="text-red-600">
            <ErrorMessage name="name" />
          </div>
        </td>
        <td className="pl-2">
          <Field
            id="description"
            name="description"
            type="text"
            autoComplete="description"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500
                  focus:border-sky-500 focus:z-10 sm:text-sm"
            placeholder="Opis sadržaja"
          />
          <div className="text-red-600">
            <ErrorMessage name="description" />
          </div>
        </td>
        <td className="pl-4 py-4">
          <Field
            as="select"
            name="category"
            className="w-11/12 rounded-md border border-gray-300"
          >
            <option key={-1} value="default" disabled>
              Kategorija sadržaja
            </option>
            {categories.map((cat: Category, index: number) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Field>
        </td>
        <td>
          <Field
            id="startTime"
            name="startTime"
            type="datetime-local"
            autoComplete="startTime"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500
                  focus:border-sky-500 focus:z-10 sm:text-sm"
            placeholder="Vrijeme početka"
          />
          <div className="text-red-600">
            <ErrorMessage name="startTime" />
          </div>
        </td>
        <td className="pl-2">
          <Field
            id="endTime"
            name="endTime"
            type="datetime-local"
            autoComplete="endTime"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500
                  focus:border-sky-500 focus:z-10 sm:text-sm"
            placeholder="Vrijeme završetka"
          />
          <div className="text-red-600">
            <ErrorMessage name="endTime" />
          </div>
        </td>
        <td className="pl-2 pr-1">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm
                font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-sky-500"
          >
            Dodaj novi sadržaj
          </button>
        </td>
        <td className="pl-1">
          <Button
            className="bg-red-500 rounded-md"
            onClick={hideNewContentForm}
          >
            Odustani
          </Button>
        </td>
      </tr>
      <div className="pl-4 pb-2 text-red-600">
        {newContentCreationError ?? ""}
      </div>
    </FormLayout>
  );
}
