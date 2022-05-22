import React from "react";

import ContentWrapper from "../../wrappers/ContentWrapper";
import { VideoCameraIcon } from "@heroicons/react/solid";

export default function LandingPage() {
  return (
    <ContentWrapper>
      <div className="flex flex-col items-center justify-center h-96">
        <VideoCameraIcon className="text-sky-500 w-44 h-44" />
        <span className="text-3xl text-sky-500 font-extrabold">
          Projekt iz informacijskih sustava - TV
        </span>
      </div>
    </ContentWrapper>
  );
}
