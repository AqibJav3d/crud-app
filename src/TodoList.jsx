import React, { useState } from "react";
import { DndProvider } from "react-dnd";

import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Finish homework" },
    { id: 2, text: "Buy groceries" },
    { id: 3, text: "Take out trash" },
  ]);

  const [, drop] = useDrop({
    accept: "TODO",
    drop(item) {
      const newTodos = todos.map((todo) =>
        todo.id === item.id ? { ...item, dropped: true } : todo
      );
      setTodos(newTodos);
    },
  });

  return (
    <DndProvider>
      <ul ref={drop}>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </DndProvider>
  );
};

const Todo = ({ todo }) => {
  const [, drag] = useDrag({
    item: { type: "TODO", id: todo.id, text: todo.text },
  });

  return (
    <li ref={drag}>
      {todo.text}
      {todo.dropped && <span> - Completed!</span>}
    </li>
  );
};

export default TodoList;
