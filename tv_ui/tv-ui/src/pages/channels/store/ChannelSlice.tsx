import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as channelsApi from "../../../api/channels";

import { ErrorResponse } from "../../../models/error/errorResponse";
import { fetchWrapper } from "../../../store/utils/fetchwrapper";
import { Channel } from "../models/channel/channel";

const getChannelById = createAsyncThunk(
  "channels/byId",
  async (channelId: string) => {
    return await fetchWrapper<Channel>(channelsApi.getChannelById(channelId));
  }
);

type ChannelState = {
  channel: Channel;
  status: "idle" | "success" | "waiting" | "error";
  error?: ErrorResponse;
};

export const channelInitialState: ChannelState = {
  channel: {} as Channel,
  status: "idle",
  error: { statusCode: 0, message: "" },
};

export const channelSlice = createSlice({
  name: "channels/byId",
  initialState: channelInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannelById.pending, (state) => {
      state.status = "waiting";
    });

    builder.addCase(getChannelById.fulfilled, (state, action) => {
      state.status = "success";
      state.channel = action.payload;
    });

    builder.addCase(getChannelById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload as ErrorResponse;
    });
  },
});

export const channel = channelSlice.reducer;
export const channelAction = {
  getChannelById,
  ...channelSlice.actions,
};
