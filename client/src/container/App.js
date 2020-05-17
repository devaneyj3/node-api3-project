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
import { useHistory } from 'react-router-dom' 

const App = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  let history = useHistory()

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
      const index = users.findIndex(user => user.id === data.id)

      //update the old data in the array at this index with the new data
      users[index] = updatedPostData

      //set it to state
      setUsers([...users]);

      history.push("/Users");
    } catch (err) {
      setMessage(err.response.data.message)
    }
  };

  return (
    <blogContext.Provider value={{ users, setUsers, Delete, Update, message }}>
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
