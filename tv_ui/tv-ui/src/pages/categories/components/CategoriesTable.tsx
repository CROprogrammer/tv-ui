import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store/reducer";
import Button from "../../../components/Button";
import { categoriesAction } from "../store/CategoriesSlice";
import { Category } from "../models/category";
import CategoryTableRow from "./CategoryTableRow";
import NewCategoryForm from "./NewCategoryForm";

export default function CategoriesTable() {
  const [newCategoryFormOpened, setNewCategoryFormOpened] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [numOfCategories, setNumOfCategories] = useState<number>(
    categories.length != null ? categories.length : 0
  );

  useEffect(() => {
    dispatch(categoriesAction.getAllCategories());
  }, [dispatch, numOfCategories]);

  const showNewCategoryForm = () => {
    setNewCategoryFormOpened(!newCategoryFormOpened);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-sky-500 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Naziv
            </th>
            <th scope="col" className="px-6 py-3">
              Opis
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: Category, index: number) => (
            <CategoryTableRow
              key={index}
              categoryId={category.categoryId}
              name={category.name}
              description={category.description}
              numOfCategories={numOfCategories}
              setNumOfCategories={setNumOfCategories}
            />
          ))}
        </tbody>
      </table>
      {localStorage.getItem("userRole") === "ROLE_editor" ? (
        <div>
          {newCategoryFormOpened ? (
            <NewCategoryForm
              hideNewCategoryForm={showNewCategoryForm}
              numOfCategories={numOfCategories}
              setNumOfCategories={setNumOfCategories}
            />
          ) : (
            <div className="px-4 py-2">
              <Button
                className="bg-sky-500 rounded-md"
                onClick={showNewCategoryForm}
              >
                Dodavanje nove kategorije
              </Button>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
