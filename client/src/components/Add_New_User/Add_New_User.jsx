import React, { useState, useContext } from "react";
import axiosInstance from "../../Axios/axiosInstance";
import { blogContext } from "../../context/blogContext";
import { useHistory } from "react-router-dom";
import { Alert, Button } from "reactstrap";
import "./Add_New_User.scss";

const AddNewUser = () => {
  const [AddNewUser, setAddNewUser] = useState({
    id: Date.now(),
    name: "",
  });
  const [message, setMessage] = useState("");

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
        setMessage(res.data.name + " was added. Redirecting...");
      })
      .catch((err) => setMessage(err.errorMessage));
    setAddNewUser({ name: "" });

    setTimeout(() => {
      history.push("/Users");
    }, 2000);
  };

  return (
    <>
      <section className="AddNewUser">
        <h1>Add New User</h1>
        {message ? <Alert color="success">{message}</Alert> : null}
        <form onSubmit={submitForm}>
          <input
            text="text"
            name="name"
            onChange={change}
            value={AddNewUser.name}
            placeholder="Name"
          />
          <br/>
          <Button color="success" type="submit">
            Add New User
          </Button>
        </form>
      </section>
    </>
  );
};

export default AddNewUser;
