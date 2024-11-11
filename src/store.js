import { createStore } from "redux";
import uuid4 from "uuid4";

// Initial State
const initialState = {
  todoList: [],
  filter: 'all',
  loading: false,
  error: null
};

// Action Types
export const TODO_ACTIONS = {
  ADD: 'todo/add',
  DELETE: 'todo/delete',
  TOGGLE: 'todo/toggle',
  UPDATE: 'todo/update',
  SET_FILTER: 'todo/setFilter',
  SET_LOADING: 'todo/setLoading',
  SET_ERROR: 'todo/setError'
};

// Reducer
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TODO_ACTIONS.ADD:
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            id: uuid4(),
            title: action.payload.title,
            done: false,
            level: action.payload.level || 1,
            assignedTo: action.payload.assignedTo,
            createdAt: new Date().toISOString()
          },
        ],
        error: null
      };

    case TODO_ACTIONS.DELETE:
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== action.payload),
        error: null
      };

    case TODO_ACTIONS.TOGGLE:
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload
            ? { ...todo, done: !todo.done }
            : todo
        ),
        error: null
      };

    case TODO_ACTIONS.UPDATE:
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload.id
            ? {
              ...todo,
              ...action.payload.updates,
              updatedAt: new Date().toISOString()
            }
            : todo
        ),
        error: null
      };

    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    case TODO_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case TODO_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

// Action Creators
export const addTodo = (title, level, assignedTo) => ({
  type: TODO_ACTIONS.ADD,
  payload: { title, level, assignedTo }
});

export const deleteTodo = (id) => ({
  type: TODO_ACTIONS.DELETE,
  payload: id
});

export const toggleTodo = (id) => ({
  type: TODO_ACTIONS.TOGGLE,
  payload: id
});

export const updateTodo = (id, updates) => ({
  type: TODO_ACTIONS.UPDATE,
  payload: { id, updates }
});

export const setFilter = (filter) => ({
  type: TODO_ACTIONS.SET_FILTER,
  payload: filter
});

export const setLoading = (isLoading) => ({
  type: TODO_ACTIONS.SET_LOADING,
  payload: isLoading
});

export const setError = (error) => ({
  type: TODO_ACTIONS.SET_ERROR,
  payload: error
});

// Selectors
export const selectTodos = (state) => state.todoList;
export const selectActiveTodos = (state) => state.todoList.filter(todo => !todo.done);
export const selectCompletedTodos = (state) => state.todoList.filter(todo => todo.done);
export const selectFilter = (state) => state.filter;
export const selectLoading = (state) => state.loading;
export const selectError = (state) => state.error;

// Create Store
const Store = createStore(
  todoReducer
);

export default Store;
