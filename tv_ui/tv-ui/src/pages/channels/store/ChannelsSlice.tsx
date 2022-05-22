import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as channelsApi from "../../../api/channels";

import { ErrorResponse } from "../../../models/error/errorResponse";
import { fetchWrapper } from "../../../store/utils/fetchwrapper";
import { Channel } from "../models/channel/channel";

const getAllChannels = createAsyncThunk("channels", async () => {
  const userRole = localStorage.getItem("userRole");
  if (userRole == "ROLE_editor") {
    return await fetchWrapper<Channel[]>(channelsApi.getAllOwnedChannels());
  } else {
    return await fetchWrapper<Channel[]>(channelsApi.getAllChannels());
  }
});

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
    builder.addCase(getAllChannels.pending, (state) => {
      state.status = "waiting";
    });

    builder.addCase(getAllChannels.fulfilled, (state, action) => {
      state.status = "success";
      state.channels = action.payload;
    });

    builder.addCase(getAllChannels.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload as ErrorResponse;
    });
  },
});

export const channels = channelsSlice.reducer;
export const channelsAction = {
  getAllChannels,
  ...channelsSlice.actions,
};
