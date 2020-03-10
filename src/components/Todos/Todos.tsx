import React, { useState } from "react";
import TodoInput from "./todoInput";
import axios from "src/config/axios";

export default function Todos() {
  const [description, setDescription] = useState<string>("");
  const descriptionChange = (value: string) => {
    setDescription(value);
  };
  const addTodo = async () => {
    try {
      const response = await axios.post("todos", { description: description });
      console.log(response.data);
    } catch (e) {
      throw new Error(e);
    }
  };
  return (
    <div className="Todos" id="Todos">
      <TodoInput description={description} handleChange={descriptionChange} addTodo={addTodo} />
    </div>
  );
}
