import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import axios from "src/config/axios";
import TodoItem from "src/components/Todos/TodoItem";
import "./Todos.scss";

interface Todos {
  description: string;
  id: number;
}

export default function Todos() {
  const [description, setDescription] = useState<string>("");
  const [todos, setTodos] = useState<Todos[]>([]);
  const descriptionChange = (value: string) => {
    setDescription(value);
  };
  const addTodo = async () => {
    const response = await axios.post("todos", { description: description });
    await setTodos([response.data.resource, ...todos]);
  };
  useEffect(() => {
    const getTodo = async () => {
      const response = await axios.get("todos");
      setTodos(response.data.resources);
    };
    getTodo();
  }, []);

  return (
    <div className="Todos" id="Todos">
      <TodoInput description={description} handleChange={descriptionChange} addTodo={addTodo} />
      <main>
        {todos.map((item) => {
          return <TodoItem key={item.id} {...item}></TodoItem>;
        })}
      </main>
    </div>
  );
}
