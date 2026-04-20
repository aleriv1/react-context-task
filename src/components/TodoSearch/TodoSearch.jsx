import styles from "./TodoSearch.module.scss";

export const TodoSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <label className={styles.wrapper}>
      {/* <span className={styles.label}>Поиск</span> */}
      <span className={styles.label}></span>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Найти задачу"
        className={styles.input}
      />
    </label>
  );
};
