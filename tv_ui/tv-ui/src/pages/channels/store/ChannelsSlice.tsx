import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as channelsApi from "../../../api/channels";

import { ErrorResponse } from "../../../models/error/errorResponse";
import { fetchWrapper } from "../../../store/utils/fetchwrapper";
import { Channel } from "../models/channel/channel";

const getChannels = createAsyncThunk(
  "channels",
  async (channelName: string | null) => {
    const userRole = localStorage.getItem("userRole");
    if (channelName !== null) {
      if (userRole == "ROLE_editor") {
        return await fetchWrapper<Channel[]>(
          channelsApi.getOwnedChannelsByName(channelName)
        );
      } else {
        return await fetchWrapper<Channel[]>(
          channelsApi.getChannelsByName(channelName)
        );
      }
    } else {
      if (userRole == "ROLE_editor") {
        return await fetchWrapper<Channel[]>(channelsApi.getAllOwnedChannels());
      } else {
        return await fetchWrapper<Channel[]>(channelsApi.getAllChannels());
      }
    }
  }
);

type ChannelsState = {
  channels: Channel[];
  status: "idle" | "success" | "waiting" | "error";
  error?: ErrorResponse;
};

export const channelsInitialState: ChannelsState = {
  channels: [] as Channel[],
  status: "idle",
  error: { statusCode: 0, message: "" },
};

export const channelsSlice = createSlice({
  name: "channels",
  initialState: channelsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannels.pending, (state) => {
      state.status = "waiting";
    });

    builder.addCase(getChannels.fulfilled, (state, action) => {
      state.status = "success";
      state.channels = action.payload;
    });

    builder.addCase(getChannels.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload as ErrorResponse;
    });
  },
});

export const channels = channelsSlice.reducer;
export const channelsAction = {
  getChannels,
  ...channelsSlice.actions,
};
