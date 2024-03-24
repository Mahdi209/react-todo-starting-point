import React, { useState } from "react";
import uuid4 from "uuid4";
import TodoItem from "./TodoItem";
import DoneItems from "./DoneItems";

function TodoList({ todoData }) {
  const [todoList, setTodoList] = useState(todoData);
  const [todoTitle, setTodoTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setTodoTitle(event.target.value);
    setErrorMessage("");
  };

  const handleCreate = () => {
    if (!todoTitle.trim()) {
      setErrorMessage("You need to type something");
      return;
    }

    const TodoObject = {
      id: uuid4(),
      title: todoTitle,
      done: false, // Make sure the initial value of done is set to false
    };
    setTodoList([...todoList, TodoObject]);
    setTodoTitle("");
  };

  const handleDelete = (todoId) => {
    setTodoList(todoList.filter((todo) => todo.id !== todoId));
  };

  const handleSave = (todoId, newTitle) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === todoId ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const handleComplete = (todoId) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === todoId ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const completedTodo = todoList.map((todo) => todo.done);

  return (
    <div className="mx-24 flex flex-col gap-3 items-center">
      <div className="flex flex-col gap-4 w-full mb-10">
        <div className="flex gap-4">
          <input
            className="h-14 w-full ml-8 mt-5 border-b-slate-500 border-solid border-2 rounded-2xl p-3 text-2xl"
            type="text"
            placeholder="Enter New Todo"
            onChange={handleChange}
            value={todoTitle}
          />
          <button
            className="mr-8 mt-5 border-emerald-300 border-solid border-2 rounded-2xl h-14 w-24 bg-teal-400 hover:bg-teal-600"
            onClick={handleCreate}
          >
            Add
          </button>
        </div>
        {errorMessage && (
          <label className="text-red-600 ml-10">{errorMessage}</label>
        )}
      </div>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDelete={handleDelete}
          handleSave={handleSave}
          handleComplete={handleComplete}
          // Pass handleComplete function
        />
      ))}
      <DoneItems completedTodo={completedTodo} />
    </div>
  );
}

export default TodoList;
