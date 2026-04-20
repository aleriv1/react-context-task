import styles from "./TodoSortToggle.module.scss";

export const TodoSortToggle = ({ isSortEnabled, onToggle }) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${
        isSortEnabled ? styles.buttonActive : ""
      }`}
      onClick={onToggle}
    >
      {isSortEnabled ? "Сортировка А→Я" : "Без сортировки"}
    </button>
  );
};
