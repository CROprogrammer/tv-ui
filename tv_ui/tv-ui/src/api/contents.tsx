import * as paths from "./paths";

import {
  Content,
  NewContentFormData,
} from "../pages/channels/models/channel/content";

export async function createContent(
  newContentData: NewContentFormData,
  channelId: string
): Promise<Response> {
  const contentArray: NewContentFormData[] = [];
  contentArray.push(newContentData);
  return await fetch(paths.content.createContent(channelId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
    body: JSON.stringify(contentArray),
  });
}

export async function putContent(
  editContentData: NewContentFormData,
  contentId: string
): Promise<Response> {
  return await fetch(paths.content.contentById(contentId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
    body: JSON.stringify(editContentData),
  });
}

export async function deleteContent(contentId: string): Promise<Response> {
  return await fetch(paths.content.contentById(contentId), {
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
  });
}
