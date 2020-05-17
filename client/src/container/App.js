import React, { useState, useEffect } from "react";
import "./App.scss";
import { Route, Redirect } from "react-router-dom";
import { blogContext } from "../context/blogContext";
import axiosInstance from "../Axios/axiosInstance";
import Nav from "../components/Nav/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Edit_User from "../components/Edit_User/Edit_User";
import AddNewUser from "../components/Add_New_User/Add_New_User";
import Users from "../components/Users/Users";
import { useHistory } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import NewPost from '../components/NewPost/NewPost';

const App = () => {
  const [users, setUsers] = useState([]);
  const [ posts, setPosts ] = useState([]);
  const [message, setMessage] = useState("");
  let history = useHistory();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const getPostsPromise = await axiosInstance.get("/");
      setUsers(getPostsPromise.data);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const Delete = (id) => {
    axiosInstance.delete(`/${id}`).then((res) => {
      const filtered = users.filter((user) => res.data !== user.id);
      setUsers(filtered);
    });
  };
  const Update = async (id, data) => {
    try {
      //updated elements of the updated form
      data.id = parseInt(id);
      const updatePost = await axiosInstance.put(`/${id}`, data);
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

  const getPosts = async (id) => {
    try {
      const posts = await axiosInstance.get(`/${id}/posts`);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const addPost = async (id, changes, name) => {
    try {
      const add = await axiosInstance.post(`/${id}/posts`, changes);
      setPosts([...posts, add.data])
      setMessage('Your post has been added. Redirecting...');
      setTimeout(()=> {
        history.goBack()
      }, 2000)
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <blogContext.Provider
      value={{ users, posts, addPost, getPosts, setUsers, Delete, Update, message }}>
      <div className="container">
        <Nav />
        <Route exact path="/Users" component={Users} />
        <Route exact path="/Add_New_User" component={AddNewUser} />
        <Route exact path="/edit/:id/:name" component={Edit_User} />
        <Route exact path="/posts/:id/:name" component={Posts} />
        <Route exact path='/addNewPost/:id/:name' component={NewPost}/>
        <Redirect from="/" to="/Users" />
      </div>
    </blogContext.Provider>
  );
};

export default App;
