import { Content } from "./content";

export type Channel = {
  id: number;
  name: string;
  description: string;
  logo: string;
  contentList: Content[];
};

export type ChannelsResponse = {
  channelList: Channel[];
};

export type NewChannelFormData = {
  logo?: string;
  name: string;
  description: string;
};
