import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = styled.nav`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`;

const NavItems = styled.ul`
  display: flex;
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`;

const NavItem = styled.li`
  font-size: 19px;
  font-weight: bold;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const Navbar = () => {
  return (
    <>
      <Logo>Todo</Logo>
      <NavItems>
        <NavItem>
          <Link to="/todos">Todo</Link>
        </NavItem>
        <NavItem>
          <Link to="/todos">Add New Todo</Link>
        </NavItem>
      </NavItems>
    </>
  );
};

export default Navbar;
