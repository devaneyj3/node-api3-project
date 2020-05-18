import React from "react";
import { Button } from "reactstrap";
import "./Post.scss";
import axiosInstance from "../../Axios/axiosInstance";

const Post = (props) => {
  const deletePost = async (id) => {
    console.log(`Deleting ID ${id}`);
  };
  return (
    <section className="post-card">
      <h3>{props.text}</h3>
      <Button color="danger" onClick={() => deletePost(props.id)}>
        Delete
      </Button>
      <Button color="primary">Edit</Button>
    </section>
  );
};

export default Post;
