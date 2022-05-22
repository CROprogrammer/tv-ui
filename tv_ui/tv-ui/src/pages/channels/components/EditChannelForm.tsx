import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";

import { ErrorMessage, Field } from "formik";

import FileUploadComponent from "./FileUploadComponent";
import Button from "../../../components/Button";
import { Channel } from "../models/channel/channel";

type EditChannelFormProps = {
  channel: Channel;
  uploadImage: (contentString: string) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function EditChannelForm({
  channel,
  uploadImage,
}: EditChannelFormProps) {
  const [logo, setLogo] = useState<string>(channel.logo);

  useEffect(() => {
    setLogo(channel.logo);
  }, [channel]);

  const resetLogo = () => {
    setLogo(channel.logo);
  };

  useEffect(() => {
    console.log("logo reset");
  }, [resetLogo]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full mb-5 table-fixed text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-sky-500 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Logo
            </th>
            <th scope="col" className="px-6 py-3">
              Naziv
            </th>
            <th scope="col" className="px-6 py-3">
              Opis
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Save</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Cancel</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {channel.id}
            </th>
            <td className="px-1">
              <FileUploadComponent
                setContent={(content) => {
                  uploadImage(
                    content == null && channel.logo != null
                      ? channel.logo
                      : content
                  );
                  setLogo(content.substr(content.indexOf(",") + 1));
                }}
                maxFileSize={2000000}
                readAs="url"
                acceptContentType="image/jpeg, image/png, image/gif, image/webp, image/bmp"
              >
                <div
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500
                  focus:border-sky-500 focus:z-10 sm:text-sm"
                >
                  {logo === "" || logo == null ? (
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
                className="group relative w-3/4 flex justify-center py-2 px-4 border border-transparent text-sm
                font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-sky-500"
              >
                Spremi
              </button>
            </td>
            <td className="pl-1">
              <Button
                className="bg-red-500 rounded-md"
                type="reset"
                onClick={resetLogo}
              >
                Odustani
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
