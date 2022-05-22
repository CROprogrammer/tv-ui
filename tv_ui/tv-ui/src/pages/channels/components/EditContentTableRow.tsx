import React, { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";

import FormLayout from "../../../components/FormLayout";
import { NewContentFormData } from "../models/channel/content";
import * as Yup from "yup";
import { ErrorMessage, Field, FormikHelpers } from "formik";
import * as contentApi from "../../../api/contents";
import { makeToast } from "../../../utils/makeToast";
import Button from "../../../components/Button";
import { TrashIcon } from "@heroicons/react/solid";
import { categoriesAction } from "../../categories/store/CategoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";
import { Category } from "../../categories/models/category";

type ContentTableRowProps = {
  contentId: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  category: string;
  numOfContent: number;
  setNumOfContent: (numOfContent: number) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const editContentValidationSchema = Yup.object().shape({
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

export default function EditContentTableRow({
  contentId,
  name,
  description,
  startTime,
  endTime,
  category,
  numOfContent,
  setNumOfContent,
}: ContentTableRowProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoriesAction.getAllCategories());
  }, [dispatch]);

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const onSubmitEditContent = async (
    editContentData: NewContentFormData,
    formikHelpers: FormikHelpers<NewContentFormData>
  ) => {
    formikHelpers.setSubmitting(true);
    const response = await contentApi.putContent(
      editContentData,
      contentId as unknown as string
    );
    if (response.status === 200) {
      makeToast("Uspješno ažuriranje sadržaja.");
    }
    formikHelpers.setSubmitting(false);
  };

  const deleteContent = async () => {
    if (
      window.confirm("Jeste li sigurni da želite izbrisati sadržaj.").valueOf()
    ) {
      await contentApi.deleteContent(contentId as unknown as string);
      setNumOfContent(numOfContent - 1);
      makeToast("Uspješno obrisan sadržaj kanala.");
    }
  };

  return (
    <FormLayout
      initialValues={
        {
          name: name,
          description: description,
          startTime: startTime.split(" ")[0] + "T" + startTime.split(" ")[1],
          endTime: endTime.split(" ")[0] + "T" + endTime.split(" ")[1],
          category: category,
        } as NewContentFormData
      }
      onSubmit={(values: NewContentFormData, formikHelpers) =>
        onSubmitEditContent(values, formikHelpers)
      }
      validationSchema={editContentValidationSchema}
    >
      <tr className="w-full bg-white last:border-sky-500 dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          {contentId}
        </th>
        <td className="pl-20">
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
        <td className="pl-6 py-4">
          <Field
            as="select"
            name="category"
            className="rounded-md border border-gray-300"
          >
            {categories.map((cat: Category, index: number) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Field>
        </td>
        <td className="pl-4">
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
        <td className="pl-3 pr-1">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm
                font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-sky-500"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Spremi&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </td>
        <td className="px-1">
          <Button className="bg-red-500 rounded-md" type="reset">
            Odustani
          </Button>
        </td>
        <td className="pl-1">
          <Button
            className="bg-red-500 rounded-md"
            type="button"
            onClick={deleteContent}
          >
            &nbsp;
            <TrashIcon
              className="h-6 text-white-400 group-hover:text-white-500"
              aria-hidden="true"
            />
          </Button>
        </td>
      </tr>
    </FormLayout>
  );
}
