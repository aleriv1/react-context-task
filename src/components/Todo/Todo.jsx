import { useEffect, useState } from "react";
import styles from "./Todo.module.scss";
import { useContext } from "react";
import { TodosContext } from "../context";

export const Todo = ({ todoLabel, id, editing }) => {
  const [todoLabelInput, setTodoLabelInput] = useState(todoLabel);

  const { dispatch } = useContext(TodosContext);

  useEffect(() => {
    setTodoLabelInput(todoLabel);
  }, [todoLabel]);

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = todoLabelInput.trim();

    if (!trimmedValue) {
      return;
    }

    dispatch({
      type: "CHANGE_TODO_LABEL",
      payload: { id, todoLabelInput: trimmedValue },
    });
  };

  const onTodoLabelChange = (e) => {
    setTodoLabelInput(e.target.value);
  };

  const toggleEditing = () => {
    dispatch({ type: "EDIT_TODO", payload: { id, editingState: !editing } });
  };

  return (
    <li className={`${styles.todoItem} ${editing ? styles.editing : ""}`}>
      {!editing ? (
        <div className={styles.todoLabel}>
          <p>{todoLabel}</p>
          <div className={styles.actions}>
            <button
              className={`${styles.icon} ${styles["icon-edit"]}`}
              onClick={toggleEditing}
              type="button"
            >
              Редактировать
            </button>
            <button
              className={styles.icon}
              onClick={() => dispatch({ type: "DELETE_TODO", payload: id })}
              type="button"
            >
              Удалить
            </button>
          </div>
        </div>
      ) : (
        <form className={styles.todoEdit} onSubmit={onSubmit}>
          <input
            type="text"
            value={todoLabelInput}
            onChange={onTodoLabelChange}
            className={styles.editInput}
            autoFocus
          />
          <div className={styles.editActions}>
            <button className={styles.save} type="submit">
              Сохранить
            </button>
            <button
              className={styles.cancel}
              type="button"
              onClick={toggleEditing}
            >
              Отменить
            </button>
          </div>
        </form>
      )}
    </li>
  );
};
