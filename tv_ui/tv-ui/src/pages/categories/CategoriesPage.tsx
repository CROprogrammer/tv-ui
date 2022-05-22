import React from "react";

import ContentWrapper from "../../wrappers/ContentWrapper";
import CategoriesTable from "./components/CategoriesTable";

export default function CategoriesPage() {
  return (
    <ContentWrapper>
      <div className="py-4 px-24">
        <CategoriesTable />
      </div>
    </ContentWrapper>
  );
}
