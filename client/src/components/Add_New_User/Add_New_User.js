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

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const newUser = await axiosInstance.post("/", AddNewUser);
      data.setUsers([...data.users, newUser.data]);
      setMessage(newUser.data.name + " was added. Redirecting...");
      setTimeout(() => {
        history.push("/Users");
      }, 2000);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <>
      <section className="AddNewUser">
        <h1>Add New User</h1>
        {message ? <Alert color="info">{message}</Alert> : null}
        <form onSubmit={submitForm}>
          <input
            text="text"
            name="name"
            onChange={change}
            value={AddNewUser.name}
            placeholder="Name"
          />
          <br />
          <Button color="success" type="submit">
            Add New User
          </Button>
        </form>
      </section>
    </>
  );
};

export default AddNewUser;
