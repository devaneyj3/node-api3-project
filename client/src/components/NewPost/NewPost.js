import React, { useState, useContext } from "react";
import { Button, Alert } from "reactstrap";
import { BlogContext } from "../../useReducer";
import { usersURL } from "../../Axios/axiosInstance";
import { useHistory } from "react-router-dom";

const NewPost = (props) => {
  const [NewPost, setNewPost] = useState({
    text: "",
  });
  const [message, setMessage] = useState("");

  const [state, dispatch] = useContext(BlogContext);
  const history = useHistory();

  const { id } = props.match.params;

  const change = (e) => {
    setNewPost({ ...NewPost, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const add = await usersURL.post(`/${id}/posts`, NewPost);
      dispatch({ type: "addPost", payload: add.data });
      setMessage("Your post has been added. Redirecting...");
      setTimeout(() => {
        history.goBack();
      }, 2000);
    } catch (err) {
      setMessage(err.response.data.message);
    }
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
