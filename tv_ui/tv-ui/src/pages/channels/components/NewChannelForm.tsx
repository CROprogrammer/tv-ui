import React, { DetailedHTMLProps, HTMLAttributes, useState } from "react";

import { ErrorMessage, Field, FormikHelpers } from "formik";

import cx from "classnames";

import * as Yup from "yup";
import * as channelApi from "../../../api/channels";

import FormLayout from "../../../components/FormLayout";
import { NewChannelFormData } from "../models/channel/channel";
import Button from "../../../components/Button";
import FileUploadComponent from "./FileUploadComponent";
import { makeToast } from "../../../utils/makeToast";

type NewChannelFormProps = {
  hideNewChannelForm: () => void;
  numOfChannels: number;
  setNumOfChannels: (numOfChannels: number) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const newChannelValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(255, "Upisani naziv je predugačak")
    .required("Potrebno je upisati naziv kanala"),
  description: Yup.string().required("Potrebno je upisati opis kanala"),
});

export default function NewChannelForm({
  hideNewChannelForm,
  numOfChannels,
  setNumOfChannels,
  className,
}: NewChannelFormProps) {
  const [newChannelCreationError, setNewChannelCreationError] =
    useState<string>("");
  const [logo, setLogo] = useState<string>("");

  const newChannelFormClassname = cx(
    "flex flex-row items-center px-4 pt-2",
    className
  );

  const onSubmitAddNewChannel = async (
    newChannelData: NewChannelFormData,
    formikHelpers: FormikHelpers<NewChannelFormData>
  ) => {
    formikHelpers.setSubmitting(true);
    const response = await channelApi.createNewChannel(newChannelData);
    if (response.status !== 200) {
      setNewChannelCreationError(
        "Neuspješna izrada kanala. Kanal s upisanim imenom već postoji."
      );
    } else {
      setNewChannelCreationError("");
      setNumOfChannels(numOfChannels + 1);
      makeToast("Novi kanal uspješno dodan.");
    }
    formikHelpers.setSubmitting(false);
  };

  const uploadImage = (contentString: string) => {
    const logoString = contentString.substr(contentString.indexOf(",") + 1);
    setLogo(logoString);
  };

  return (
    <FormLayout
      initialValues={
        { logo: "", name: "", description: "" } as NewChannelFormData
      }
      onSubmit={(values: NewChannelFormData, formikHelpers) => {
        values.logo = logo;
        onSubmitAddNewChannel(values, formikHelpers);
      }}
      validationSchema={newChannelValidationSchema}
    >
      <tr className={newChannelFormClassname}>
        <td className="pr-1">
          <FileUploadComponent
            setContent={(content) => uploadImage(content)}
            maxFileSize={2000000}
            readAs="url"
            acceptContentType="image/jpeg, image/png, image/gif, image/webp, image/bmp"
          >
            <div
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500
                  focus:border-sky-500 focus:z-10 sm:text-sm"
            >
              {logo === "" ? (
                "Dodaj logo kanala"
              ) : (
                <img
                  className="w-10 h-10"
                  src={`data:image;base64, ${logo}`}
                  alt="container image"
                />
              )}
            </div>
          </FileUploadComponent>
          <div className="text-red-600">
            <ErrorMessage name="logo" />
          </div>
        </td>
        <td className="px-1">
          <Field
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500
                  focus:border-sky-500 focus:z-10 sm:text-sm"
            placeholder="Naziv kanala"
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
            placeholder="Opis kanala"
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
            Dodaj novi kanal
          </button>
        </td>
        <td className="pl-1">
          <Button
            className="bg-red-500 rounded-md"
            onClick={hideNewChannelForm}
          >
            Odustani
          </Button>
        </td>
      </tr>
      <div className="pl-4 pb-2 text-red-600">
        {newChannelCreationError ?? ""}
      </div>
    </FormLayout>
  );
}
