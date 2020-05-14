import React, { useState, useContext } from "react";
import axiosInstance from "../../Axios/axiosInstance";
import { blogContext } from "../../context/blogContext";
import { useHistory } from "react-router-dom";
import moment from  'moment';

const AddNewUser = () => {
  const [AddNewUser, setAddNewUser] = useState({
    id: Date.now(),
    name: "",
  });

  const history = useHistory();

  const data = useContext(blogContext);

  const change = (e) => {
    setAddNewUser({ ...AddNewUser, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/", AddNewUser)
      .then((res) => {
        console.log(res.data);
        data.setUsers([...data.users, res.data]);
      })
      .catch((err) => console.log(err.errorMessage));
    setAddNewUser({ name: ""});
    history.push("/Users");
  };

  return (
    <section className="AddNewUser">
      <form onSubmit={submitForm}>
        <input
          text="text"
          name="name"
          onChange={change}
          value={AddNewUser.name}
          placeholder="Name"
        />
        <input type="submit" />
      </form>
    </section>
  );
};

export default AddNewUser;
