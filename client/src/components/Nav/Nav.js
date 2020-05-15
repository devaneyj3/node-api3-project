import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  return (
    <section className="Nav">
      <nav>
        <NavLink to="/Users">Users</NavLink>
        <NavLink to="/Add_New_User">Add New User</NavLink>
      </nav>
    </section>
  );
};

export default Nav;
