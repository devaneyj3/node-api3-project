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

const App = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  console.log(process.env)
  useEffect(() => {
    async function fetchData() {
      const getPostsPromise = await axiosInstance.get("/");
      setUsers(getPostsPromise.data);
    }
    fetchData();
  }, []);

  const Delete = (id) => {
    axiosInstance.delete(`/${id}`).then((res) => {
      console.log(res.data)
      const filtered = users.filter((user) => res.data !== user.id );
      console.log(filtered)
      setUsers(filtered);
      setMessage(`Post with ID: ${res.data} has been deleted`);
    }); 
  };

  //TODO: UPDATE WON'T WORK
  const Update = async (id, data,) => {
    try {
      const updatePost = await axiosInstance.put(`/${id}`, data);
      const updatedPostData = updatePost.data
      const filterePosts = users.filter((post => post.id === id)) 
      console.log(id)
      console.log(users)
      console.log(filterePosts)
      setUsers([...users, updatedPostData]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <blogContext.Provider
      value={{ users, setUsers, Delete, Update, message }}>
      <div className="container">
        <Nav />
        <Route exact path="/Users" component={Users} />
        <Route path="/Add_New_User" component={AddNewUser} />
        <Route path="/edit/:id/:name" component={Edit_User} />
        <Redirect from="/" to="/Users" />
      </div>
    </blogContext.Provider>
  );
};

export default App;
