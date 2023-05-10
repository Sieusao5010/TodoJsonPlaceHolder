import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function TodoScreen() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [userid, setUserid] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((user) => setUsers(user));
  });
  const handleSelect = (e) => {
    setUserid(e);
    setShow(true);
  };
  useEffect(() => {
    setLoadingPage(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${userid}/todos`)
      .then((res) => res.json())
      .then((todo) => setTodos(todo));
    setLoadingPage(false);
  }, [userid]);
  const completed = todos.reduce((count, item) => {
    if (item.completed) {
      return count + 1;
    }
    return count;
  }, 0);

  const handleMarkDone = (id) => {
    setLoading(true);

    // Tìm task có id truyền vào trong mảng todos
    const task = todos.find((todo) => todo.id === id);

    // Nếu không tìm thấy task, thoát khỏi hàm
    if (!task) return;

    // Gọi API để update completed = true cho task tương ứng
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: true }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update lại todos state với completed của task mới được update
        const updatedTodos = todos.map((todo) => {
          if (todo.id === data.id) {
            return { ...todo, completed: data.completed };
          }
          return todo;
        });
        setTodos(updatedTodos);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="wrap">
      <DropdownButton
        id="dropdown-basic-button"
        title="Select user"
        variant="secondary"
        onSelect={handleSelect}
      >
        {users.map((user) => (
          <Dropdown.Item eventKey={user.id} key={user.id} href="">
            {user.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <h5 style={{ marginTop: "1rem" }}>Tasks</h5>
      {loadingPage ? (
        <h6>Loading....</h6>
      ) : (
        <div className="todo-content">
          {!show ? (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                minHeight: "500px",
                fontSize: "30px",
                color: "#cccccc",
              }}
            >
              No Content
            </span>
          ) : (
            <ul>
              {todos
                .sort((a, b) => {
                  if (!a.completed && b.completed) {
                    return -1;
                  } else if (a.completed && !b.completed) {
                    return 1;
                  } else {
                    return 0;
                  }
                })
                .map((todo) => (
                  <li key={todo.id}>
                    {todo.completed ? (
                      <i
                        className="bi bi-check-circle"
                        style={{
                          fontSize: "20px",
                          color: "green",
                          padding: "1rem",
                        }}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-dash-circle"
                        style={{
                          fontSize: "18px",
                          color: "yellow",
                          padding: "1rem",
                        }}
                      ></i>
                    )}

                    {todo.title}
                    <ul>
                      {!todo.completed && (
                        <button
                          type="button"
                          className="btn btn-warning btn-sm"
                          onClick={() => handleMarkDone(todo.id)}
                          style={{
                            float: "right",
                            marginTop: "-30px",
                            color: "white",
                          }}
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "Mark Done"}
                        </button>
                      )}
                    </ul>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}

      <span>
        Done {completed}/{todos.length} tasks
      </span>
    </div>
  );
}

export default TodoScreen;
