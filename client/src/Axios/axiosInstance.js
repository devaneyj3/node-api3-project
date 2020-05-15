import axios from "axios";

//this makes it work
const ENV = process.env.NODE_ENV === 'development' ?  'http://localhost:7000/api/users' : 'https://blog1234567.herokuapp.com/api/users'

export default axios.create({
  baseURL: ENV
});
