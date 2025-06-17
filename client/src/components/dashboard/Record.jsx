import { useState } from "react";

function Record() {
  const [form, setForm] = useState({ title: "", content: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/dashboard/createPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("post created");
    }
  };

  return (
    <>
      <h1>Create post</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <input
          type="text"
          name="body"
          placeholder="content"
          value={form.body}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          POST
        </button>
      </form>
    </>
  );
}

export default Record;
