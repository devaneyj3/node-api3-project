import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../../useReducer";
import { usersURL } from "../../Axios/axiosInstance";
import User from "../User/User";
import "./Users.scss";
import { Alert } from "reactstrap";
import moment from "moment";

const Users = () => {
  const [state, dispatch] = useContext(BlogContext);
  const [message, setMessage] = useState("");

  const getUsers = async () => {
    try {
      const getUsersPromise = await usersURL.get("/");
      dispatch({ type: "getUsers", payload: getUsersPromise.data });
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const Delete = async (id) => {
    try {
      const idToDelete = await usersURL.delete(`/${id}`);
      const filtered = state.users.filter((user) => idToDelete.data !== user.id);
      dispatch({ type: "delete", payload: filtered });
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  console.log(state);

  return (
    <div className="Users-Container">
      <h3>Today is {moment().format("MMMM Do YYYY")}</h3>
      <section className="Users">
        {message ? (
          <Alert color="danger">{message}</Alert>
        ) : (
          state.users.map((user) => {
            return (
              <User
                key={user.id}
                id={user.id}
                name={user.name}
                remove={() => Delete(user.id)}
              />
            );
          })
        )}
      </section>
    </div>
  );
};

export default Users;
