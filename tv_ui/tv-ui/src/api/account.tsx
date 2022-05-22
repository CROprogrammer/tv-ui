import * as paths from "./paths";

import { RegistrationRequest } from "../pages/login/models/account/registration";
import { LoginRequest } from "../pages/login/models/account/loginRequest";

export async function login(loginData: LoginRequest): Promise<Response> {
  return await fetch(paths.account.login(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
}

export async function register(
  registrationData: RegistrationRequest
): Promise<Response> {
  return await fetch(paths.account.registration(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  });
}
