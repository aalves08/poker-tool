export const STORAGE_UID = "planning-poker-user-id";
export const ROLES = {
  USER: "user",
  ADMIN: "admin",
};
let SERVER_URL;
if (process.env.NODE_ENV === "production") {
  SERVER_URL = "http://146.190.150.213:8080";
} else {
  SERVER_URL = "http://localhost:8080";
}
export { SERVER_URL };
