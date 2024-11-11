import React from 'react';

function AddTaskModal({ isOpen, onClose, onSubmit, todoTitle, onTitleChange, errorMessage }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all">
                {/* Modal Header */}
                <div className="p-6 border-b border-indigo-100">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-indigo-900">Add New Task</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="task-title" className="block text-sm font-medium text-indigo-900 mb-2">
                                Task Title
                            </label>
                            <input
                                id="task-title"
                                type="text"
                                value={todoTitle}
                                onChange={onTitleChange}
                                placeholder="What needs to be done?"
                                className="w-full px-4 py-2.5 border-2 border-indigo-200 rounded-xl
                         focus:outline-none focus:border-indigo-400 focus:ring-2 
                         focus:ring-indigo-200 focus:ring-offset-2
                         text-base placeholder-indigo-300 transition-all duration-200"
                            />
                        </div>

                        {errorMessage && (
                            <p className="text-rose-500 text-sm flex items-center gap-2">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errorMessage}
                            </p>
                        )}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-indigo-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 
                     rounded-lg transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg
                     hover:bg-indigo-700 active:bg-indigo-800
                     transition-colors duration-200 flex items-center gap-2"
                    >
                        <span>Add Task</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddTaskModal; 