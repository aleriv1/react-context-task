import { useState } from "react";
import styles from "./NewTodoForm.module.scss";

export const NewTodoForm = ({ addNewTodo }) => {
  const [todoLabel, setTodoLabel] = useState("");

  const onNewTodoLableChange = (e) => {
    setTodoLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmedLabel = todoLabel.trim();

    if (!trimmedLabel) {
      return;
    }

    addNewTodo(trimmedLabel);
    setTodoLabel("");
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        type="text"
        value={todoLabel}
        onChange={onNewTodoLableChange}
        placeholder="Что нужно сделать?"
        className={styles.input}
      />
      <button className={styles.submit} type="submit" disabled={!todoLabel.trim()}>
        Добавить
      </button>
    </form>
  );
};
