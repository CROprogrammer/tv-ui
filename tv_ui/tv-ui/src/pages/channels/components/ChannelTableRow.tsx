import React, { DetailedHTMLProps, HTMLAttributes, useState } from "react";

import * as channelApi from "../../../api/channels";

import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

import { Content } from "../models/channel/content";
import ContentTableRow from "./ContentTableRow";
import { useHistory } from "react-router-dom";
import { makeToast } from "../../../utils/makeToast";

type ChannelTableRowProps = {
  channelId: number;
  name: string;
  description: string;
  logo: string | null;
  contentList: Content[];
  numOfChannels: number;
  setNumOfChannels: (numOfChannels: number) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function ChannelTableRow({
  channelId,
  name,
  description,
  logo,
  contentList,
  numOfChannels,
  setNumOfChannels,
}: ChannelTableRowProps) {
  const [detailsShown, setDetailsShown] = useState<boolean>(false);
  const history = useHistory();

  const showDetails = () => {
    setDetailsShown(!detailsShown);
  };

  const deleteChannel = async () => {
    if (
      window.confirm("Jeste li sigurni da želite izbrisati kanal.").valueOf()
    ) {
      await channelApi.deleteChannel(channelId as unknown as string);
      setNumOfChannels(numOfChannels - 1);
      makeToast("Kanal uspješno obrisan.");
    }
  };

  const redirectToEditPage = () => {
    history.push(`/channels/${channelId}/edit`);
  };

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          {channelId}
        </th>
        <td className="px-6 py-4">
          {logo ? (
            <img
              className="w-10 h-10"
              src={`data:image;base64, ${logo}`}
              alt="container image"
            />
          ) : (
            "TV"
          )}
        </td>
        <td className="px-6 py-4">{name}</td>
        <td className="px-6 py-4">{description}</td>
        <td className="px-6 py-4">
          <div
            className="font-medium text-sky-500 dark:text-sky-400 hover:underline cursor-pointer"
            onClick={showDetails}
          >
            Detalji
          </div>
        </td>
        <td className="px-6 py-4 text-right">
          {localStorage.getItem("userRole") === "ROLE_editor" ? (
            <div
              className="font-medium text-sky-500 dark:text-sky-400 hover:underline cursor-pointer"
              onClick={redirectToEditPage}
            >
              <PencilIcon
                className="h-5 w-5 text-orange-400 group-hover:text-orange-500"
                aria-hidden="true"
              />
            </div>
          ) : (
            ""
          )}
        </td>
        <td className="px-6 py-4 text-right">
          {localStorage.getItem("userRole") === "ROLE_editor" ? (
            <div
              className="font-medium text-sky-500 dark:text-sky-400 hover:underline cursor-pointer"
              onClick={deleteChannel}
            >
              <TrashIcon
                className="h-5 w-5 text-red-400 group-hover:text-red-500"
                aria-hidden="true"
              />
            </div>
          ) : (
            ""
          )}
        </td>
      </tr>
      {detailsShown ? (
        <tr>
          <td colSpan={7}>
            <table className="w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-sky-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Naziv
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Opis
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kategorija
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Vrijeme početka
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Vrijeme završetka
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {contentList.map((content: Content, index: number) => (
                  <ContentTableRow
                    key={index}
                    contentId={content.id}
                    name={content.name}
                    description={content.description}
                    category={content.category}
                    startTime={content.startTime}
                    endTime={content.endTime}
                  />
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      ) : (
        ""
      )}
    </>
  );
}
