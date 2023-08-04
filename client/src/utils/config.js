import axios from "axios";

const BASE_URL = "https://task-v88l.onrender.com/";

const user = JSON.parse(localStorage.getItem("root"))?.user;

var TOKEN;
const currentUser = user && JSON.parse(user).currentUser;
TOKEN = currentUser?.token;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: TOKEN },
});