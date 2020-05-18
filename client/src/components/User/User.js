import React from "react";
import "./User.scss";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const User = (props) => {
  let history = useHistory();
  const edit = (id, name) => {
    history.push(`/edit/${id}/${name}`);
  };

  const goToUserPost = (id, name) => {
    history.push(`posts/${id}/${name}`);
  };
  return (
    <section className="Name-Card">
      <p onClick={() => goToUserPost(props.id, props.name)} className="name">
        {props.name}
      </p>
      <Button onClick={props.remove} color="danger">
        Delete
      </Button>
      <Button onClick={() => edit(props.id, props.name)} color="primary">
        Edit
      </Button>
    </section>
  );
};

export default User;
