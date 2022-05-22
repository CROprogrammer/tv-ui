import React, { DetailedHTMLProps, HTMLAttributes } from "react";

import { useHistory } from "react-router-dom";

import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

import * as categoryApi from "../../../api/categories";
import { makeToast } from "../../../utils/makeToast";

type CategoryTableRowProps = {
  categoryId: number;
  name: string;
  description: string;
  numOfCategories: number;
  setNumOfCategories: (numOfCategories: number) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function CategoryTableRow({
  categoryId,
  name,
  description,
  numOfCategories,
  setNumOfCategories,
}: CategoryTableRowProps) {
  const history = useHistory();

  const deleteCategory = async () => {
    if (
      window
        .confirm("Jeste li sigurni da želite izbrisati kategoriju.")
        .valueOf()
    ) {
      await categoryApi.deleteCategory(categoryId as unknown as string);
      setNumOfCategories(numOfCategories - 1);
      makeToast("Kategorija upješno obrisana.");
    }
  };

  const redirectToEditPage = () => {
    history.push(`/categories/${categoryId}/edit`);
  };

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          {categoryId}
        </th>
        <td className="px-6 py-4">{name}</td>
        <td className="px-6 py-4">{description}</td>
        <td className="px-6 py-4 text-right">
          {localStorage.getItem("userRole") === "ROLE_editor" ? (
            <div
              className="font-medium text-sky-500 dark:text-sky-400 hover:underline cursor-pointer"
              onClick={redirectToEditPage}
            >
              <PencilIcon
                className="h-5 w-5 text-orange-400 group-hover:text-orange-500"
                aria-hidden="true"
              />
            </div>
          ) : (
            ""
          )}
        </td>
        <td className="px-6 py-4 text-right">
          {localStorage.getItem("userRole") === "ROLE_editor" ? (
            <div
              className="font-medium text-sky-500 dark:text-sky-400 hover:underline cursor-pointer"
              onClick={deleteCategory}
            >
              <TrashIcon
                className="h-5 w-5 text-red-400 group-hover:text-red-500"
                aria-hidden="true"
              />
            </div>
          ) : (
            ""
          )}
        </td>
      </tr>
    </>
  );
}
