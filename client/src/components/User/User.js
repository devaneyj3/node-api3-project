import React from "react";
import "./User.scss";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const User = (props) => {
  let history = useHistory();
  const edit = (id, name) => {
    history.push(`/edit/${id}/${name}`);
  };
  return (
    <section className="Name-Card">
      <p className="name">{props.name}</p>
      <Button onClick={props.delete} color="danger">
        Delete
      </Button>
      <Button onClick={() => edit(props.id, props.name)} color="primary">
        Edit
      </Button>
    </section>
  );
};

export default User;
