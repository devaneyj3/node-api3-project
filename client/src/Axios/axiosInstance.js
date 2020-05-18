import axios from "axios";

const user = "users";
const posts = "posts";

const userServer =
  process.env.NODE_ENV === "development"
    ? `http://localhost:7000/api/${user}`
    : `https://blog1234567.herokuapp.com/api/${user}`;

const postServer =
  process.env.NODE_ENV === "development"
    ? `http://localhost:7000/api/${posts}`
    : `https://blog1234567.herokuapp.com/api/${posts}`;

export const usersURL = axios.create({
  baseURL: userServer,
});

export const postsURL = axios.create({
  baseURL: postServer,
});
