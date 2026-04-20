import { TodosContext } from "../context";
import { Todo } from "../Todo/Todo";
import styles from "./TodoList.module.scss";
import { useContext } from "react";

export const TodoList = ({ debouncedQuery }) => {
  const { todos, isSortEnabled } = useContext(TodosContext);

  const filtered = todos.filter(({ todoLabel }) => {
    return todoLabel.toLowerCase().includes(debouncedQuery);
  });

  const prepared = isSortEnabled
    ? [...filtered].sort((a, b) => a.todoLabel.localeCompare(b.todoLabel))
    : filtered;

  return prepared.length ? (
    <ul className={styles.list}>
      {prepared.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </ul>
  ) : (
    <p className={styles.empty}>Ничего не найдено.</p>
  );
};
