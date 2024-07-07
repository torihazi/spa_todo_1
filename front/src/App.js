import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import TodoList from "./components/TodoList";

const Navbar = styled.nav`
  background: #dbfffe;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

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

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`;

function App() {
  return (
    <Router>
      <Navbar>
        <Logo>Todo</Logo>
        <NavItems>
          <NavItem>
            <Link to="/todos">Todo</Link>
          </NavItem>
          <NavItem>
            <Link to="/todos/new">Add NewTodo</Link>
          </NavItem>
        </NavItems>
      </Navbar>
      <Wrapper>
        <Routes>
          <Route path="/todos" element={<TodoList />}></Route>
          <Route path="/todos/new" element={<AddTodo />}></Route>
          <Route path="/todos/:id/edit" element={<EditTodo />}></Route>
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
