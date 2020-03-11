import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import axios from "src/config/axios";
import TodoItem from "src/components/Todos/TodoItem";
import "./Todos.scss";

interface Todos {
  description: string;
  completed: boolean;
  deleted: boolean;
  id: number;
  update: (x: {}) => void;
  editing?: boolean;
}

export default function Todos() {
  const [description, setDescription] = useState<string>("");
  const [todos, setTodos] = useState<Todos[]>([]);
  const descriptionChange = (value: string) => {
    setDescription(value);
  };
  const addTodo = async () => {
    const response = await axios.post("todos", { description: description });
    setTodos([response.data.resource, ...todos]);
  };
  const updateTodo = async (id: number, payload: any) => {
    const response = await axios.put(`todos/${id}`, payload);
    const newTodos = todos.map((item) => {
      if (id === item.id) {
        return response.data.resource;
      } else {
        return item;
      }
    });
    await setTodos(newTodos);
  };
  const toggleEditMode = (id: number) => {
    const newTodos = todos.map((item) => {
      if (id === item.id) {
        return Object.assign({}, item, { editing: true });
      } else {
        return Object.assign({}, item, { editing: false });
      }
    });
    setTodos(newTodos);
  };
  useEffect(() => {
    const getTodo = async () => {
      const response = await axios.get("todos");
      const editingTodos = response.data.resources.map((item: Todos) => Object.assign({}, item, { editing: false }));
      setTodos(editingTodos);
    };
    getTodo();
  }, []);

  return (
    <div className="Todos" id="Todos">
      <TodoInput description={description} handleChange={descriptionChange} addTodo={addTodo} />
      <main className="Todos-list">
        {todos.map((item) => {
          return <TodoItem key={item.id} {...item} toggleEditMode={toggleEditMode} update={updateTodo}></TodoItem>;
        })}
      </main>
    </div>
  );
}
