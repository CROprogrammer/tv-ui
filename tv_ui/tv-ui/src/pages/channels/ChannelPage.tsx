import React from "react";

import ContentWrapper from "../../wrappers/ContentWrapper";
import ChannelsTable from "./components/ChannelsTable";

export default function ChannelPage() {
  return (
    <ContentWrapper>
      <div className="py-4 px-24">
        <ChannelsTable />
      </div>
    </ContentWrapper>
  );
}
