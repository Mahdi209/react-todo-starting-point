import React from "react";

function DoneItems({ completedTodo }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-indigo-100
                    rounded-xl sm:rounded-2xl shadow-lg
                    p-6 sm:p-8 flex flex-col gap-4 sm:gap-5">
      <div className="flex items-center gap-3 border-b border-indigo-100 pb-4">
        <svg
          className="w-6 h-6 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-xl sm:text-2xl font-bold text-indigo-900">
          Finished Tasks
        </h2>
        <span className="ml-auto bg-indigo-100 text-indigo-600 text-sm 
                        font-medium px-3 py-1 rounded-full">
          {completedTodo.length} tasks
        </span>
      </div>

      {completedTodo.length === 0 ? (
        <div className="text-center py-6 text-indigo-400">
          <p>No completed tasks yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {completedTodo.map((todo) => (
            <div
              className="flex items-center justify-between gap-4 p-3 sm:p-4
                         bg-indigo-50/50 rounded-lg hover:bg-indigo-50
                         transition-colors duration-200"
              key={todo.id}
            >
              <div className="flex items-center gap-3 min-w-0">
                <svg
                  className="w-5 h-5 flex-shrink-0 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-indigo-900 truncate">{todo.title}</p>
              </div>
              <span className="px-2.5 py-1 bg-green-100 text-green-700 
                              text-sm font-medium rounded-full flex-shrink-0">
                Completed
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoneItems;
