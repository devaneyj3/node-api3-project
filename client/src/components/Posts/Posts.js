import React, { useEffect, useContext } from "react";
import Post from "../Post/Post";
import "./Posts.scss";
import { blogContext } from "../../context/blogContext";
import { Alert, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const Posts = (props) => {
  const { id } = props.match.params;
  const { name } = props.match.params;

  const data = useContext(blogContext);
  const history = useHistory();
  //make sure message is clear
  data.message = ''

  useEffect(() => {
    data.getPosts(id);
  }, [data, id]);

  const goToAddPost = (id, name) => {
    history.push(`/addNewPost/${id}/${name}`);
  };

  return (
    <>
      <Button onClick={() => goToAddPost(id, name)} color="info">
        Add Post
      </Button>
      <section className="posts">
        <h2>Here are the posts for {name}</h2>
        {data.message ? <Alert color="danger">{data.message}</Alert> : null}
        {data.posts.map((post) => {
          return <Post text={post.text} />;
        })}
      </section>
    </>
  );
};

export default Posts;
