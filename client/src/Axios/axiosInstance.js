import axios from "axios";


export default axios.create({
  baseURL: '/api/users'
});

//'https://blog1234567.herokuapp.com/api/users' //http://localhost:7000/api/users'