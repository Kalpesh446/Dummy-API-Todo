import axios from "axios";
import React, { useEffect, useId, useState } from "react";
import { Button, Form } from "react-bootstrap";

export const ShowData = () => {
  const [userId, setUserId] = useState("");
  console.log(userId);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    todo: "",
    Completed: false,
    userId: "userId",
  });

  useEffect(() => {
    setNewTodo((prevNewTodo) => ({
      ...prevNewTodo,
      userId: userId,
    }));
  }, [userId]);

  console.log(newTodo);

  const HandleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setNewTodo({ ...newTodo, [name]: valueToUse });
  };

  useEffect(() => {
    const user = localStorage.getItem("loginData");
    const userParse = JSON.parse(user);
    setUserId(userParse.id);
    console.log(userParse.id);
  }, []);
  useEffect(() => {
    const showData = async (e) => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/${userId}/todos`);
        // Handle the response as needed
        setTodos(response.data.todos);
      } catch (error) {
        alert.error("There was an error making the request:", error);
      }
    };
    if (userId) {
      showData();
    }
    // showData();
  }, [userId]);
  const HandleAddTodo = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior if this function is called on form submit

    try {
      const response = await axios.post(`https://dummyjson.com/todos/add`, newTodo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Handle the response as needed
      setNewTodo(response.data);
      console.log(response.data);
      setNewTodo({
        todo: "",
        Completed: false,
        userId: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>show data</h1>

      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <p>
              <strong>Todo:</strong> {todo.todo}
            </p>
            <p>
              <strong>Completed:</strong> {todo.completed ? "Yes" : "No"}
            </p>
            <p>
              <strong>User ID:</strong> {todo.userId}
            </p>
          </li>
        ))}
      </ul>

      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header justify-content-center">
              <Form className="w-100">
                <Form.Group className="mb-3" controlId="formBasicTodo">
                  <Form.Label>Todo</Form.Label>
                  <Form.Control type="text" placeholder="Enter Todo" value={newTodo.todo} name="todo" onChange={HandleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicBoolean">
                  <Form.Label>Completed ?</Form.Label>
                  <Form.Check type="checkbox" label="True" checked={newTodo.Completed} name="Completed" onChange={HandleChange} />
                </Form.Group>
              </Form>
            </div>
            <div className="modal-footer justify-content-center">
              <Button data-bs-dismiss="modal" onClick={HandleAddTodo} variant="primary" type="submit">
                Add Todos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
