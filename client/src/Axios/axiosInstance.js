import axios from "axios";


export default axios.create({
  baseURL:  process.env.NODE_ENV =='production' ? 'https://blog1234567.herokuapp.com/api/users' : 'http://localhost:7000/api/users' 
});

