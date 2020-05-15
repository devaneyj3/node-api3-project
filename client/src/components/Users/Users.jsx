import React, { useContext } from "react";
import { blogContext } from "../../context/blogContext";
import User from "../User/User";
import "./Users.scss";
import { Alert } from "reactstrap";
import moment from "moment";

const Users = () => {
  const data = useContext(blogContext);
  return (
    <div className="Users-Container">
      <h3>Today is {moment().format("MMMM Do YYYY")}</h3>
      <section className="Users">
        {data.users.length === 0 ? (
          <Alert color="danger">There are no users</Alert>
        ) : (
          data.users.map((user) => {
            return (
              <User
                key={user.id}
                id={user.id}
                name={user.name}
                delete={() => data.Delete(user.id)}
              />
            );
          })
        )}
      </section>
    </div>
  );
};

export default Users;
