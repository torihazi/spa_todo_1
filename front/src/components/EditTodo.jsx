import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import client from "../lib/api/client";
import { toast } from "react-toastify";

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
  margin: 12px 0;
`;

const CurrentStatus = styled.div`
  font-size: 19px;
  margin: 8px 0 12px 0;
  font-weight: bold;
`;

const IsCompletedButton = styled.button`
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  background: #f2a115;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const EditButton = styled.button`
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  margin: 0 10px;
  background: #0ac620;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  background: #f54242;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const EditTodo = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialTodoState = {
    id: null,
    name: "",
    is_completed: false,
  };
  const [currentTodo, setCurrentTodo] = useState(initialTodoState);

  const getTodo = (id) => {
    client
      .get(`/todos/${id}`)
      .then((res) => {
        setCurrentTodo(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTodo(id);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTodo({ ...currentTodo, name: value });
  };

  const updateIsComplete = (val) => {
    let data = {
      id: val.id,
      name: val.name,
      is_completed: !val.is_completed,
    };
    client.patch(`/todos/${val.id}`, data).then((res) => {
      setCurrentTodo(res.data);
    });
  };

  const notify = () => {
    toast.success("Todo Successfully", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  };
  const updateTodo = () => {
    client
      .patch(`/todos/${currentTodo.id}`, currentTodo)
      .then((res) => {
        notify();
        navigate("/todos");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTodo = () => {
    const sure = window.confirm("Are you sure?");
    if (sure) {
      client
        .delete(`/todos/${currentTodo.id}`)
        .then((res) => {
          notify();
          navigate("/todos");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <h1>Edit Todo</h1>
      <div>
        <div>
          <label htmlFor="name">Current name</label>
          <InputName
            type="text"
            name="name"
            value={currentTodo.name}
            onChange={handleInputChange}
          />
        </div>
        <span>Current Status</span>
        <CurrentStatus>
          {currentTodo.is_completed ? "Completed" : "Umcomleted"}
        </CurrentStatus>
      </div>
      {currentTodo.is_completed ? (
        <IsCompletedButton onClick={() => updateIsComplete(currentTodo)}>
          UnCompleted
        </IsCompletedButton>
      ) : (
        <IsCompletedButton onClick={() => updateIsComplete(currentTodo)}>
          Completed
        </IsCompletedButton>
      )}
      <EditButton onClick={updateTodo}>Update</EditButton>
      <DeleteButton onClick={deleteTodo}>Delete</DeleteButton>
    </>
  );
};

export default EditTodo;
