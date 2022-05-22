import { combineReducers } from "@reduxjs/toolkit";

import { channels } from "../pages/channels/store/ChannelsSlice";
import { channel } from "../pages/channels/store/ChannelSlice";
import { categories } from "../pages/categories/store/CategoriesSlice";
import { category } from "../pages/categories/store/CategorySlice";

export const rootReducer = combineReducers({
  channels,
  channel,
  categories,
  category,
});

export type RootState = ReturnType<typeof rootReducer>;
