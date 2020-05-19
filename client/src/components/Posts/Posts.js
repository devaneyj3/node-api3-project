import React, { useContext, useState } from "react";
import Post from "../Post/Post";
import "./Posts.scss";
import { BlogContext } from "../../useReducer";
import { Alert, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const Posts = (props) => {
  const [message, setMessage] = useState("");
  const { id } = props.match.params;
  const { name } = props.match.params;

  const [state, dispatch] = useContext(BlogContext);
  console.log(dispatch)
  const history = useHistory();


  // useEffect(() => {
  //   getPosts(id, name, setMessage);
  // }, []);

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
        {/* {posts.map((post) => {
          return (
            <Post
              key={post.id}
              text={post.text}
              remove={() => {
                data.deletePost(post.id);
                console.log("deleting");
              }} */}
            />
          );
        })}
      </section>
    </>
  );
};

export default Posts;
