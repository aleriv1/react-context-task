import { TodosContext } from "../context";
import { useContext } from "react";
import styles from "./TodoSortToggle.module.scss";

export const TodoSortToggle = ({ onToggle }) => {
  const { isSortEnabled } = useContext(TodosContext);

  return (
    <button
      type="button"
      className={`${styles.button} ${isSortEnabled ? styles.buttonActive : ""}`}
      onClick={onToggle}
    >
      {isSortEnabled ? "Сортировка А→Я" : "Без сортировки"}
    </button>
  );
};
