import { usersURL, postsURL } from "../Axios/axiosInstance";
import Nav from "../components/Nav/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Edit_User from "../components/Edit_User/Edit_User";
import AddNewUser from "../components/Add_New_User/Add_New_User";
import Users from "../components/Users/Users";
import { useHistory } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import NewPost from "../components/NewPost/NewPost";
import { ContextProvider } from "../useReducer";
import React, { useState } from "react";
import "./App.scss";
import { Route, Redirect } from "react-router-dom";;

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  let history = useHistory();

  const Update = async (id, data) => {
    try {
      //updated elements of the updated form
      data.id = parseInt(id);
      const updatePost = await usersURL.put(`/${id}`, data);
      const updatedPostData = updatePost.data;

      //find where the element that was updated was at in orginal array
      const index = users.findIndex((user) => user.id === data.id);

      //update the old data in the array at this index with the new data
      users[index] = updatedPostData;

      //set it to state
      setUsers([...users]);

      history.push("/Users");
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const getPosts = async (id, name, set) => {
    try {
      const posts = await usersURL.get(`/${id}/posts`);
      //TODO:IF I ADD A POST IT ADDS FOR ALL AND INFINITE LOOP REQUEST
      if (id == name) {
        setPosts(posts.data); 
      }
    } catch (err) {
      set(err.response.data.message);
    }
  };

  const addPost = async (id, changes, set) => {
    try {
      const add = await usersURL.post(`/${id}/posts`, changes);
      setPosts([...posts, add.data]);
      set("Your post has been added. Redirecting...");
      setTimeout(() => {
        history.goBack();
      }, 2000);
    } catch (err) {
      set(err.response.data.message);
    }
  };
  const deletePost = async (id) => {
    const remove = await postsURL.delete(`/${id}`);
    console.log("I'm deleting the post");
    try {
      const filtered = posts.filter((post) => remove.data !== post.id);
      setPosts([filtered]);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <ContextProvider>
      <div className="container">
        <Nav />
        <Route exact path="/Users" component={Users} />
        <Route exact path="/Add_New_User" component={AddNewUser} />
        <Route exact path="/edit/:id/:name" component={Edit_User} />
        <Route exact path="/posts/:id/:name" component={Posts} />
        <Route exact path="/addNewPost/:id/:name" component={NewPost} />
        <Redirect from="/" to="/Users" />
      </div>
    </ContextProvider>
  );
};

export default App;
