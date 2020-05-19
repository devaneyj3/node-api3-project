import { usersURL, postsURL } from "../Axios/axiosInstance";
import Nav from "../components/Nav/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Edit_User from "../components/Edit_User/Edit_User";
import AddNewUser from "../components/Add_New_User/Add_New_User";
import Users from "../components/Users/Users";
import Posts from "../components/Posts/Posts";
import NewPost from "../components/NewPost/NewPost";
import { ContextProvider } from "../useReducer";
import React, { useState } from "react";
import "./App.scss";
import { Route, Redirect } from "react-router-dom";;

const App = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

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
