import React, { useState, useContext } from "react";
import { Button } from "reactstrap";
import { blogContext } from "../../context/blogContext";
import './Edit_User.scss';

const Edit_User = (props) => {
  const [Edit_User, setEdit_User] = useState({
    name: "",
  });

  const { id } = props.match.params;
  const { name } = props.match.params;

  const data = useContext(blogContext);

  const change = (e) => {
    setEdit_User({ ...Edit_User, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    data.Update(id, Edit_User);
    setEdit_User({ name: "" });
    props.history.push("/Posts");
  };

  return (
    <>
      <section className="Edit_User">
        <h1>Edit the user</h1>
        <form onSubmit={submitForm}>
          <input
            text="text"
            name="name"
            onChange={change}
            value={Edit_User.name}
            placeholder={name}
          />
          <br/>
          <Button color="success" type="submit">
            Edit
          </Button>
        </form>
      </section>
    </>
  );
};

export default Edit_User;
