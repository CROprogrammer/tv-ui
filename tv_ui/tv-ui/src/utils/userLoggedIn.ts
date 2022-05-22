export function isUserLoggedIn() {
  return localStorage.getItem("jwt") != null;
}
