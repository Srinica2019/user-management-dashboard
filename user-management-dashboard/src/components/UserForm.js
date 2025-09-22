import React, { useEffect, useState } from "react";

function UserForm({ addUser, updateUser, editingUser }) {
  const [form, setForm] = useState({ name: "", email: "", company: "" });

  useEffect(() => {
    if (editingUser) {
      setForm({
        name: editingUser.name,
        email: editingUser.email,
        company: editingUser.company?.name || "",
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Please fill required fields");

    if (editingUser) {
      updateUser(editingUser.id, { ...editingUser, ...form, company: { name: form.company } });
    } else {
      addUser({ ...form, company: { name: form.company } });
    }

    setForm({ name: "", email: "", company: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
      />
      <button type="submit">{editingUser ? "Update" : "Add"}</button>
    </form>
  );
}

export default UserForm;
