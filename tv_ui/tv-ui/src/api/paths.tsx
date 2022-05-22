export const account = {
  login: () => "/login",
  registration: () => "/register",
};

export const channel = {
  channels: () => "/channels",
  channelsByName: (channelName: string) => `/channels/search/${channelName}`,
  ownedChannels: () => "/channels/owned",
  channelsWithId: (channelId: string) => `/channels/${channelId}`,
  getChannelById: (channelId: string) => `/channels/byId/${channelId}`,
};

export const content = {
  contentById: (contentId: string) => `/contents/${contentId}`,
  createContent: (channelId: string) => `/channels/${channelId}/contents`,
};

export const category = {
  categories: () => "/categories",
  categoriesByName: (categoryName: string) => `/categories/search/${categoryName}`,
  categoryById: (categoryId: string) => `/categories/${categoryId}`,
};
