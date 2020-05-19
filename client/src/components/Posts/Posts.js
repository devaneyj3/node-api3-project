import React, { useEffect, useContext, useState } from "react";
import Post from "../Post/Post";
import "./Posts.scss";
import { usersURL } from "../../Axios/axiosInstance";
import { BlogContext } from "../../useReducer";
import { Alert, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const Posts = (props) => {
  const [message, setMessage] = useState("");
  const { id } = props.match.params;
  const { name } = props.match.params;

  const [state, dispatch] = useContext(BlogContext);

  const history = useHistory();

  const getPosts = async (id) => {
    try {
      const posts = await usersURL.get(`/${id}/posts`);
      dispatch({ type: "getPosts", payload: posts.data });
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    getPosts(id);
  }, []);

  const goToAddPost = (id, name) => {
    history.push(`/addNewPost/${id}/${name}`);
  };
  //filter through all the posts in state to find the ones tied to the name of the person I want to see the posts of
  const getUniquePostByName = state.posts.filter(post => post.postedBy === name)
  console.log('The unique posts are ', getUniquePostByName)
  return (
    <>
      <Button onClick={() => goToAddPost(id, name)} color="info">
        Add Post
      </Button>
      <h2>Here are the posts for {name}</h2>
      {message ? <Alert color="danger">{message}</Alert> : null}
      <section className="posts">
        {getUniquePostByName.map((post) => {
          return (
            <Post
              key={post.id}
              text={post.text}
              // remove={() => {
              //   data.deletePost(post.id);
              //   console.log("deleting");
              // }}

              //TODO:REMOVE POST AND EDIT POST
            />
          );
        })}
      </section>
    </>
  );
};

export default Posts;
