import React, { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import SearchFilter from "./components/SearchFilter";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Add user
  const addUser = (user) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers([...users, { ...user, id: users.length + 1 }]);
      });
  };

  // Edit user
  const updateUser = (id, updatedUser) => {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then(() => {
        setUsers(users.map((u) => (u.id === id ? updatedUser : u)));
        setEditingUser(null);
      });
  };

  // Delete user
  const deleteUser = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() => {
      setUsers(users.filter((u) => u.id !== id));
    });
  };

  // Filtered users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>User Management Dashboard</h1>

      <SearchFilter setSearchTerm={setSearchTerm} />

      <UserForm
        addUser={addUser}
        updateUser={updateUser}
        editingUser={editingUser}
      />

      <UserTable
        users={filteredUsers}
        deleteUser={deleteUser}
        setEditingUser={setEditingUser}
      />
    </div>
  );
}

export default App;
