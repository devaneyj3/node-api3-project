import React, { createContext } from "react";
import { useReducer } from "react";

export const BlogContext = createContext();

const initialState = {
  users: [],
  posts: []
};

const reducer = (state, aciton) => {
  switch (aciton.type) {
    case "getUsers":
      return {
        ...state,
        users: aciton.payload,
      };
    case "delete":
          return {
          ...state,
        users: aciton.payload,
      };
    case "addUser":
          return {
          ...state,
          users: [...state.users, aciton.payload],
      };
    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BlogContext.Provider value={[state, dispatch]}>
      {children}
    </BlogContext.Provider>
  );
};
