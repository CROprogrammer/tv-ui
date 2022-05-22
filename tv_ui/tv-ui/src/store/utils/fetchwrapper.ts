import { ErrorResponse } from "../../models/error/errorResponse";

export async function fetchWrapper<T>(action: Promise<Response>) {
  const response = await action;
  const data = await response.json();
  if (!response.ok) {
    throw data as ErrorResponse;
  }
  return data as T;
}
