import React from "react";
import { Button } from "reactstrap";
import "./Post.scss";

const Post = (props) => {
  return (
    <section className="post-card">
      <h3>{props.text}</h3>
      <Button color="danger" onClick={props.remove}>
        Delete
      </Button>
      <Button color="primary">Edit</Button>
    </section>
  );
};

export default Post;
