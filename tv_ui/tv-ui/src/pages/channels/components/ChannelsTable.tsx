import React, { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { channelsAction } from "../store/ChannelsSlice";
import { RootState } from "../../../store/reducer";
import ChannelTableRow from "./ChannelTableRow";
import { Channel } from "../models/channel/channel";
import NewChannelForm from "./NewChannelForm";
import Button from "../../../components/Button";

export default function ChannelsTable() {
  const [newChannelFormOpened, setNewChannelFormOpened] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const channels = useSelector((state: RootState) => state.channels.channels);
  const [numOfChannels, setNumOfChannels] = useState<number>(
    channels.length != null ? channels.length : 0
  );
  const [channelNameSearch, setChannelNameSearch] = useState<string | null>(null);

  useEffect(() => {
    // @ts-ignore
    dispatch(channelsAction.getChannels(channelNameSearch === "" ? null : channelNameSearch));
  }, [dispatch, numOfChannels, channelNameSearch]);

  const showNewChannelForm = () => {
    setNewChannelFormOpened(!newChannelFormOpened);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex flex-row m-2">
        <label className="mr-2 text-bold rounded-md">Pretraživanje po nazivu:</label>
        <input className="border" placeholder="Naziv kanala" onChange={event => setChannelNameSearch(event.target.value)} />
      </div>
      <table className="w-full table-fixed text-base text-left text-gray-500 dark:text-gray-400">
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
              <span className="sr-only">Details</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel: Channel, index: number) => (
            <ChannelTableRow
              key={index}
              channelId={channel.id}
              name={channel.name}
              description={channel.description}
              logo={channel.logo}
              contentList={channel.contentList}
              numOfChannels={numOfChannels}
              setNumOfChannels={setNumOfChannels}
            />
          ))}
        </tbody>
      </table>
      {localStorage.getItem("userRole") === "ROLE_editor" ? (
        <div>
          {newChannelFormOpened ? (
            <NewChannelForm
              hideNewChannelForm={showNewChannelForm}
              numOfChannels={numOfChannels}
              setNumOfChannels={setNumOfChannels}
            />
          ) : (
            <div className="px-4 py-2">
              <Button
                className="bg-sky-500 rounded-md"
                onClick={showNewChannelForm}
              >
                Dodavanje novog kanala
              </Button>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
