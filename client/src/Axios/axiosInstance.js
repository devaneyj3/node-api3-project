import axios from "axios";

const ENV = process.env.NODE_ENV === 'development' ?  'http://localhost:7000/api/users' : 'https://blog1234567.herokuapp.com/api/users'

export default axios.create({
  baseURL: ENV
});

//'https://blog1234567.herokuapp.com/api/users' //http://localhost:7000/api/users'

console.log(ENV)