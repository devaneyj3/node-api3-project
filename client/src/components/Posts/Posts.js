import React, { useEffect, useContext, useState } from "react";
import Post from "../Post/Post";
import "./Posts.scss";
import { blogContext } from "../../context/blogContext";
import { Alert, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const Posts = (props) => {
  const [message, setMessage] = useState("");
  const { id } = props.match.params;
  const { name } = props.match.params;

  const data = useContext(blogContext);
  const history = useHistory();

  useEffect(() => {
    data.getPosts(id, setMessage);
  }, [data, id]);

  const goToAddPost = (id, name) => {
    history.push(`/addNewPost/${id}/${name}`);
  };

  return (
    <>
      <Button onClick={() => goToAddPost(id, name)} color="info">
        Add Post
      </Button>
      <h2>Here are the posts for {name}</h2>
      {message ? <Alert color="danger">{message}</Alert> : null}
      <section className="posts">
        {data.posts.map((post) => {
          return <Post key={post.id} text={post.text} id={post.id} />;
        })}
      </section>
    </>
  );
};

export default Posts;
