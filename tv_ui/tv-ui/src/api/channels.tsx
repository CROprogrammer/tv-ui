import * as paths from "./paths";

import { NewChannelFormData } from "../pages/channels/models/channel/channel";

export async function getAllChannels(): Promise<Response> {
  return await fetch(paths.channel.channels(), {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
  });
}

export async function getChannelsByName(
  channelName: string
): Promise<Response> {
  return await fetch(paths.channel.channelsByName(channelName), {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
  });
}

export async function getChannelById(channelId: string): Promise<Response> {
  return await fetch(paths.channel.getChannelById(channelId), {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
  });
}

export async function getAllOwnedChannels(): Promise<Response> {
  return await fetch(paths.channel.ownedChannels(), {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
  });
}

export async function getOwnedChannelsByName(
  channelName: string
): Promise<Response> {
  return await fetch(paths.channel.ownedChannelsByName(channelName), {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
  });
}

export async function createNewChannel(
  newChannelData: NewChannelFormData
): Promise<Response> {
  return await fetch(paths.channel.channels(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
    body: JSON.stringify(newChannelData),
  });
}

export async function deleteChannel(channelId: string): Promise<Response> {
  return await fetch(paths.channel.channelsWithId(channelId), {
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
  });
}

export async function patchChannel(
  newChannelData: NewChannelFormData,
  channelId: string
): Promise<Response> {
  return await fetch(paths.channel.channelsWithId(channelId), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
    body: JSON.stringify(newChannelData),
  });
}
