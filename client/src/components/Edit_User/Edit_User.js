import React, { useState, useContext } from "react";
import { Button, Alert } from "reactstrap";
import { BlogContext } from "../../useReducer";
import { usersURL } from '../../Axios/axiosInstance';
import { useHistory } from 'react-router-dom';
import "./Edit_User.scss";

const Edit_User = (props) => {
  const [Edit_User, setEdit_User] = useState({
    name: "", 
  });
  const [message, setMessage] = useState("");
  const history = useHistory();

  const { id } = props.match.params;
  const { name } = props.match.params;

  const [state, dispatch] = useContext(BlogContext);
  
  const change = (e) => {
    setEdit_User({ ...Edit_User, [e.target.name]: e.target.value });
  };
  
  const submitForm = async (e) => {
    e.preventDefault();
      try {
        const updatePost = await usersURL.put(`/${id}`, Edit_User);
        //updated elements of the updated form
        const updatedPostData = updatePost.data;
        Edit_User.id = parseInt(id);
        console.log('edting post returns', updatePost)
        //find where the element that was updated was at in orginal array
        const index = state.users.findIndex((user) => user.id === Edit_User.id);
    
        //update the old data in the array at this index with the new data
        state.users[index] = updatedPostData;
    
        //set it to state
        dispatch({ type: "editUser", payload: state.users });
    
        history.push("/Users");
      } catch (err) {
        setMessage(err.response.data.message);
      }
    setEdit_User({ name: "" });
  };

  return (
    <>
      <section className="Edit_User">
        <h1>Edit the user</h1>
        {message ? <Alert color="danger">{message}</Alert> : null}
        <form onSubmit={submitForm}>
          <input
            text="text"
            name="name"
            onChange={change}
            value={Edit_User.name}
            placeholder={name}
          />
          <br />
          <Button color="success" type="submit">
            Edit
          </Button>
        </form>
      </section>
    </>
  );
};

export default Edit_User;
