export const STORAGE_UID = "planning-poker-user-id";
export const STORAGE_USERNAME = "planning-poker-username";
export const STORAGE_AVATAR = "planning-poker-avatar";
export const STORAGE_TOKEN = "planning-poker-token";
export const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

let SERVER_URL;
if (process.env.NODE_ENV === "production") {
  SERVER_URL = process.env.VUE_APP_SERVER_URL;
} else {
  SERVER_URL = "http://localhost:8080";
}
export { SERVER_URL };
