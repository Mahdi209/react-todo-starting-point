import React, { useState } from "react";
import uuid4 from "uuid4";
import TodoItem from "./TodoItem";
import DoneItems from "./DoneItems";
import AddTaskModal from "./AddTaskModal";
import { FiPlus } from "react-icons/fi";
import { BsListTask, BsCheckCircle } from "react-icons/bs";

function TodoList({ todoData }) {
  const [todoList, setTodoList] = useState(todoData);
  const [todoTitle, setTodoTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('active');

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
      done: false,
    };
    setTodoList([...todoList, TodoObject]);
    setTodoTitle("");
    setIsModalOpen(false);
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

  const activeTodos = todoList.filter((todo) => !todo.done);
  const completedTodos = todoList.filter((todo) => todo.done);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-indigo-100 bg-white/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-2">
              Task Management
            </h1>
            <p className="text-indigo-600/80">
              You have {activeTodos.length} active tasks and {completedTodos.length} completed
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white 
                       rounded-xl hover:bg-indigo-700 transition-all duration-200
                       flex items-center gap-2 shadow-md hover:shadow-xl
                       transform hover:-translate-y-0.5"
          >
            <FiPlus className="w-5 h-5" />
            <span className="font-medium">Add New Task</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-indigo-100/50 p-1 rounded-xl mt-6 max-w-md">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                       font-medium transition-all duration-200 ${activeTab === 'active'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-indigo-600/60 hover:text-indigo-600'
              }`}
          >
            <BsListTask className="w-5 h-5" />
            Active Tasks
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                       font-medium transition-all duration-200 ${activeTab === 'completed'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-indigo-600/60 hover:text-indigo-600'
              }`}
          >
            <BsCheckCircle className="w-5 h-5" />
            Completed
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
        {activeTab === 'active' ? (
          activeTodos.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full 
                              flex items-center justify-center mx-auto mb-4">
                  <BsListTask className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-medium text-indigo-900 mb-2">
                  No Active Tasks
                </h3>
                <p className="text-indigo-600/80">
                  Click the "Add New Task" button to create a task
                </p>
              </div>
            </div>
          ) : (
            activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleDelete={handleDelete}
                handleSave={handleSave}
                handleComplete={handleComplete}
              />
            ))
          )
        ) : (
          <DoneItems completedTodo={completedTodos} />
        )}
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setErrorMessage("");
          setTodoTitle("");
        }}
        onSubmit={handleCreate}
        todoTitle={todoTitle}
        onTitleChange={handleChange}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default TodoList;
