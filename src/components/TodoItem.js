import React, { useState } from "react";
import Timer from "./Timer";
import users from "./users.json";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

function TodoItem({
  todo,

  handleDelete,
  handleSave,
  handleComplete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleChangeTitle = (event) => {
    setNewTitle(event.target.value);
  };

  const handleOnSave = () => {
    handleSave(todo.id, newTitle);
    setIsEditing(false);
  };

  // const handleSliderChange = (event) => {
  //   setTodoList({ ...todo, Level: event.target.value });
  // };

  return (
    <div
      className={
        todo.done
          ? " hidden"
          : "flex text-white bg-teal-800 w-full h-28 justify-between items-center text-3xl rounded-full px-20 shrink grow"
      }
    >
      <div className="flex gap-7">
        <input
          type="checkbox"
          onClick={() => handleComplete(todo.id)} // Pass todo.id to handleComplete
          checked={todo.done}
        />
        {isEditing ? (
          <input
            className="text-black rounded-3xl text-2xl py-2 px-9"
            type="text"
            value={newTitle}
            onChange={handleChangeTitle}
          />
        ) : (
          <p className="w-96">{todo.title}</p>
        )}
      </div>
      <div>
        <Timer />
      </div>
      <div className="w-56 flex gap-5">
        <select
          className="rounded-3xl w-56 pl-4 text-2xl h-10 flex justify-center items-center bg-lime-100 text-black"
          name="users"
          id="myComboBox"
        >
          {users.map((user) => (
            <option className="" key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div className="flex gap-3">
          <label className="text-2xl">{todo.level}</label>
          <input type="range" min="1" max="10" step="1" value={todo.Level} />
        </div>
      </div>
      <div className="text-white flex justify-around items-center w-40">
        {isEditing ? (
          <sub className="font-bold" onClick={handleOnSave}>
            <IoCheckmarkDoneSharp />
          </sub>
        ) : (
          <sub className="" onClick={() => setIsEditing(true)}>
            <FaRegEdit />
          </sub>
        )}
        <sub
          className="hover:text-red-500 cursor-pointer "
          onClick={() => handleDelete(todo.id)}
        >
          <RiDeleteBin5Line />
        </sub>
      </div>
    </div>
  );
}

export default TodoItem;
