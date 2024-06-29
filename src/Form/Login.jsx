import axios from "axios";
import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const history = useNavigate();

  console.log(loginData);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://dummyjson.com/user/login", {
        username: loginData.userName,
        password: loginData.password,
      });
      console.log(response.data);
      localStorage.setItem("loginData", JSON.stringify(response.data));
      history("/showData");
      // Handle the response as needed
    } catch (error) {
      // alert.error("There was an error making the request:", error);
      // alert(error.message);
      alert(error.response.data.message);
    }
    setLoginData({
      userName: "",
      password: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <form action="" className="mt-3">
          <label htmlFor="">UserName</label>
          <input type="text" name="userName" id="userName" value={loginData.userName} onChange={handleInputChange} />
          <br />
          <br />
          <label htmlFor="">Password</label>
          <input type="password" name="password" id="password" value={loginData.password} onChange={handleInputChange} />
          <br />
          <br />
          <button className="btn btn-primary" type="submit" onClick={handlesubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;

// import React, { useState, useEffect } from "react";

// function Login() {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState([]);
//   const [user, setUser] = useState(null);

//   // 1. Handle Login
//   const handleLogin = async (username, password) => {
//     try {
//       const response = await fetch("https://dummyjson.com/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           password,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUser(data);
//         setIsLoggedIn(true);
//       } else {
//         // 2. Handle Login Failure
//         alert("Invalid username or password");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("An error occurred during login.");
//     }
//   };

//   // 3. Fetch Todos on Login Success
//   useEffect(() => {
//     if (isLoggedIn) {
//       const fetchTodos = async () => {
//         try {
//           const response = await fetch("https://dummyjson.com/todos?limit=3&skip=10");
//           const data = await response.json();
//           setTodos(data.todos);
//         } catch (error) {
//           console.error("Error fetching todos:", error);
//           alert("An error occurred fetching todos.");
//         }
//       };
//       fetchTodos();
//     }
//   }, [isLoggedIn]);

//   // 4. Filter Todos to Show Only Logged In User's Todos
//   const filteredTodos = todos.filter(
//     (todo) => todo.userId === user?.id // Assuming userId is available in user object
//   );

//   // 5. Handle Insert Operation (Add New Todo)
//   const handleAddTodo = async (newTodo) => {
//     try {
//       const response = await fetch("https://dummyjson.com/todos/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           todo: newTodo,
//           completed: false,
//           userId: user?.id, // Assuming userId is available in user object
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setTodos([...todos, data]); // Add new todo to the list
//       } else {
//         alert("Failed to add todo.");
//       }
//     } catch (error) {
//       console.error("Error adding todo:", error);
//       alert("An error occurred while adding todo.");
//     }
//   };

//   return (
//     <div>
//       {!isLoggedIn && (
//         <div>
//           {/* Login Form */}
//           <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
//           <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//           <button onClick={() => handleLogin(userName, password)}>Login</button>
//         </div>
//       )}

//       {isLoggedIn && (
//         <div>
//           {/* Welcome message */}
//           <h2>Welcome, {user?.username}!</h2>

//           {/* Todo List */}
//           <h3>Todos</h3>
//           <ul>
//             {filteredTodos.map((todo) => (
//               <li key={todo.id}>{todo.todo}</li>
//             ))}
//           </ul>

//           {/* Add Todo Form */}
//           <input type="text" placeholder="Add new todo" onChange={(e) => setNewTodo(e.target.value)} />
//           <button onClick={() => handleAddTodo(newTodo)}>Add</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Login;
