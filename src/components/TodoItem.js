import React, { useState } from "react";
import Timer from "./Timer";
import users from "./users.json";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillSignal } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

function TodoItem({ todo, handleDelete, handleSave, handleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newLevel, setNewLevel] = useState(todo.level || 1);
  const [assignedUser, setAssignedUser] = useState(todo.assignedTo || users[0].name);
  const [isExiting, setIsExiting] = useState(false);

  const handleCompleteWithAnimation = async (id) => {
    setIsExiting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    handleComplete(id);
  };

  const handleChangeTitle = (event) => {
    setNewTitle(event.target.value);
  };

  const handleOnSave = () => {
    handleSave(todo.id, newTitle, newLevel);
    setIsEditing(false);
  };

  const handleSliderChange = (event) => {
    setNewLevel(parseInt(event.target.value));
  };

  const handleUserChange = (event) => {
    setAssignedUser(event.target.value);
  };

  const getPriorityColor = (level) => {
    if (level <= 3) return 'bg-green-100 text-green-700';
    if (level <= 7) return 'bg-yellow-100 text-yellow-700';
    return 'bg-rose-100 text-rose-700';
  };

  return (
    <AnimatePresence mode="wait">
      {!todo.done && (
        <motion.div
          layout
          initial={{
            x: 0,
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: isExiting ? 0.95 : 1,
            transition: {
              scale: {
                duration: 0.2,
                ease: "easeOut"
              },
              opacity: {
                duration: 0.3,
                ease: "easeInOut"
              }
            }
          }}
          exit={{
            x: -100,
            opacity: 0,
            scale: 0.95,
            transition: {
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
              opacity: {
                duration: 0.25
              },
              scale: {
                duration: 0.3
              }
            }
          }}
          whileHover={{
            scale: isExiting ? 0.95 : 1.01,
            transition: { duration: 0.2 }
          }}
          className={`group bg-white rounded-xl shadow-sm hover:shadow-md 
                     border border-indigo-100 transition-colors duration-200
                     origin-left`}
        >
          <motion.div
            className="p-4 sm:p-5"
            animate={{
              opacity: isExiting ? 0.5 : 1,
              transition: { duration: 0.2 }
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.1 }}
                  >
                    <input
                      type="checkbox"
                      onClick={() => handleCompleteWithAnimation(todo.id)}
                      checked={todo.done}
                      className="w-5 h-5 rounded-lg border-2 border-indigo-300 
                               text-indigo-600 focus:ring-2 focus:ring-indigo-200
                               cursor-pointer transition-colors duration-200"
                    />
                  </motion.div>
                  {isEditing ? (
                    <motion.input
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 px-3 py-1.5 border-2 border-indigo-200 
                               rounded-lg focus:outline-none focus:border-indigo-400 
                               focus:ring-2 focus:ring-indigo-200 text-indigo-900
                               text-base w-full"
                      type="text"
                      value={newTitle}
                      onChange={handleChangeTitle}
                      autoFocus
                    />
                  ) : (
                    <motion.h3
                      layout
                      className="text-lg font-medium text-indigo-900 break-words"
                    >
                      {todo.title}
                    </motion.h3>
                  )}
                </div>

                {/* Task Details */}
                <motion.div
                  layout
                  className="mt-3 flex flex-wrap items-center gap-3"
                >
                  {/* Priority Level */}
                  <motion.div
                    layout
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 
                               rounded-full text-sm font-medium 
                               ${getPriorityColor(newLevel)}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AiFillSignal className="w-4 h-4" />
                    Priority {newLevel}
                  </motion.div>

                  {/* Assigned User */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 
                                  flex items-center justify-center">
                      <FaUser className="w-3 h-3 text-indigo-600" />
                    </div>
                    <select
                      className="text-sm text-indigo-900 bg-transparent border-none 
                                 focus:outline-none focus:ring-0 cursor-pointer
                                 pr-6"
                      value={assignedUser}
                      onChange={handleUserChange}
                    >
                      {users.map((user) => (
                        <option key={user.id} value={user.name}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Timer */}
                  <div className="ml-auto">
                    <Timer />
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                layout
                className="flex items-center gap-2"
              >
                {isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-indigo-500 hover:text-indigo-700 
                             hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                    onClick={handleOnSave}
                  >
                    <IoCheckmarkDoneSharp className="w-5 h-5" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-indigo-500 hover:text-indigo-700 
                             hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaRegEdit className="w-5 h-5" />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-rose-500 hover:text-rose-700 
                           hover:bg-rose-50 rounded-lg transition-colors duration-200"
                  onClick={() => handleDelete(todo.id)}
                >
                  <RiDeleteBin5Line className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>

            {/* Priority Slider */}
            <motion.div
              layout
              className="mt-4 flex items-center gap-3"
            >
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={newLevel}
                onChange={handleSliderChange}
                className="flex-1 h-2 bg-indigo-100 rounded-full appearance-none
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-4
                           [&::-webkit-slider-thumb]:h-4
                           [&::-webkit-slider-thumb]:bg-indigo-600
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:cursor-pointer
                           [&::-webkit-slider-thumb]:transition-all
                           [&::-webkit-slider-thumb]:duration-200
                           [&::-webkit-slider-thumb]:hover:bg-indigo-700"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoItem;
