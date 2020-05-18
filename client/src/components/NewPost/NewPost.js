import React, { useState, useContext } from "react";
import { Button, Alert } from "reactstrap";
import { blogContext } from "../../context/blogContext";

const NewPost = (props) => {
  const [NewPost, setNewPost] = useState({
    text: "",
  });
  const [message, setMessage] = useState("");

  const data = useContext(blogContext);

  const { id } = props.match.params;

  const change = (e) => {
    setNewPost({ ...NewPost, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    //this gets posted to specific users post by the setter list everyones post regardless of who it is
    data.addPost(id, NewPost, setMessage);
    setNewPost({ text: "" });
  };

  return (
    <>
      {message ? <Alert color="success">{message}</Alert> : null}
      <section className="NewPost">
        <form onSubmit={submitForm}>
          <textarea
            name="text"
            onChange={change}
            value={NewPost.text}
            placeholder="Add text"
          />
          <Button color="success" type="submit">
            Add Post
          </Button>
        </form>
      </section>
    </>
  );
};

export default NewPost;