import { useEffect, useState } from "react";
import { TodoList } from "../TodoList/TodoList";
import styles from "./App.module.scss";
import { NewTodoForm } from "../NewTodoForm/NewTodoForm";
import { TodoSearch } from "../TodoSearch/TodoSearch";
import { TodoSortToggle } from "../TodoSortToggle/TodoSortToggle";
import { TodosContext } from "../context";

const todosReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_TODOS": {
      return payload;
    }

    case "TODO_CREATED_APPLIED": {
      return [...state, payload];
    }

    case "TODO_EDIT_APPLIED": {
      return state.map((todo) => {
        return todo.id === payload.id ? { ...todo, editing: payload.editing } : todo;
      });
    }

    case "TODO_LABEL_CHANGED_APPLIED": {
      return state.map((todo) => {
        return todo.id === payload.id
          ? {
              ...todo,
              todoLabel: payload.todoLabel,
              editing: payload.editing,
            }
          : todo;
      });
    }

    case "TODO_DELETED_APPLIED": {
      return state.filter((todo) => todo.id !== payload.id);
    }

    default: {
      return state;
    }
  }
};

function AppNormalReducer() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSortEnabled, setIsSortEnabled] = useState(false);

  const apply = (action) => {
    setTodos((prevTodos) => todosReducer(prevTodos, action));
  };

  const dispatch = async (action) => {
    const { type, payload } = action;

    setIsLoading(true);

    try {
      switch (type) {
        case "CREATE_TODO": {
          const response = await fetch("http://localhost:3002/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
              id: Date.now(),
              todoLabel: payload,
              editing: false,
              completed: false,
            }),
          });

          const createdTodo = await response.json();
          apply({ type: "TODO_CREATED_APPLIED", payload: createdTodo });
          break;
        }

        case "EDIT_TODO": {
          const response = await fetch(`http://localhost:3002/todos/${payload.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
              editing: payload.editingState,
            }),
          });

          const updatedTodo = await response.json();
          apply({ type: "TODO_EDIT_APPLIED", payload: updatedTodo });
          break;
        }

        case "CHANGE_TODO_LABEL": {
          const response = await fetch(`http://localhost:3002/todos/${payload.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
              todoLabel: payload.todoLabelInput,
              editing: false,
            }),
          });

          const updatedTodo = await response.json();
          apply({ type: "TODO_LABEL_CHANGED_APPLIED", payload: updatedTodo });
          break;
        }

        case "DELETE_TODO": {
          await fetch(`http://localhost:3002/todos/${payload}`, {
            method: "DELETE",
          });

          apply({ type: "TODO_DELETED_APPLIED", payload: { id: payload } });
          break;
        }

        default:
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addNewTodo = (todo) => {
    dispatch({ type: "CREATE_TODO", payload: todo });
  };

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:3002/todos")
      .then((response) => response.json())
      .then((responseTodo) => {
        apply({ type: "SET_TODOS", payload: responseTodo });
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery.toLowerCase());
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <div className={styles.app}>
      <div className={styles.card}>
        <h1 className={styles.header}>todoS json-server</h1>
        <NewTodoForm addNewTodo={addNewTodo} />
        {isLoading ? (
          <div className={styles.loader} aria-label="Загрузка" role="status"></div>
        ) : (
          <>
            <TodosContext value={{ todos, isSortEnabled, dispatch }}>
              <TodoList todos={todos} debouncedQuery={debouncedQuery} />
              <div className={styles.controlsRow}>
                <TodoSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                <TodoSortToggle onToggle={() => setIsSortEnabled((prev) => !prev)} />
              </div>
            </TodosContext>
          </>
        )}
      </div>
    </div>
  );
}

export default AppNormalReducer;
