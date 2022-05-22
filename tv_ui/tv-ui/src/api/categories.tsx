import * as paths from "./paths";

import { NewCategoryFormData } from "../pages/categories/models/category";

export async function getAllCategories(): Promise<Response> {
  return await fetch(paths.category.categories(), {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
  });
}

export async function getCategoryById(categoryId: string): Promise<Response> {
  return await fetch(paths.category.categoryById(categoryId), {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
  });
}

export async function createNewCategory(
  newCategoryData: NewCategoryFormData
): Promise<Response> {
  return await fetch(paths.category.categories(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
    body: JSON.stringify(newCategoryData),
  });
}

export async function patchCategory(
  newCategoryData: NewCategoryFormData,
  categoryId: string
): Promise<Response> {
  return await fetch(paths.category.categoryById(categoryId), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
    body: JSON.stringify(newCategoryData),
  });
}

export async function deleteCategory(categoryId: string): Promise<Response> {
  return await fetch(paths.category.categoryById(categoryId), {
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("jwt")
        ? "Bearer " + localStorage.getItem("jwt")
        : "",
    },
  });
}
