import axios from "axios";

const address = 'http://localhost:7000/api/users' || 'https://blog1234567.herokuapp.com/api/users'

export default axios.create({
  baseURL:  address
});

console.log(address)
