import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import axios from "src/config/axios";
import TodoItem from "src/components/Todos/TodoItem";
import "./Todos.scss";

interface Todos {
  description: string;
  id: number;
  completed: boolean;
  update: (x: {}) => void;
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
  const updateTodo = async (id: number, payload: any) => {
    const response = await axios.put(`todos/${id}`, payload);
    await console.log(response);
    const newTodos = await todos.map((item) => {
      if (id === item.id) {
        return response.data.resource;
      } else {
        return item;
      }
    });
    await setTodos(newTodos);
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
      <main className="Todos-list">
        {todos.map((item) => {
          return <TodoItem key={item.id} {...item} update={updateTodo}></TodoItem>;
        })}
      </main>
    </div>
  );
}
