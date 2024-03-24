import React from "react";

function DoneItems({ completedTodo }) {
  return (
    <div className="bg-teal-500 rounded-3xl  w-full p-12 flex flex-col gap-5">
      <h2 className="text-3xl text-left ">Finished Tasks</h2>
      {completedTodo.map((todo) => (
        <div className="flex justify-between pr-6" key={todo.id}>
          <p className="">{todo.title}</p>
          <p className="text-emerald-700 font-bold">is Done</p>
        </div>
      ))}
    </div>
  );
}

export default DoneItems;
