import jwt from "jsonwebtoken";

export function getUserFromToken() {
  const token = localStorage.getItem("token");
  return jwt.decode(token).user;
}
