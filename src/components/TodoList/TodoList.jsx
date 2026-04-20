import { Todo } from "../Todo/Todo";
import styles from "./TodoList.module.scss";

export const TodoList = ({
  todos,
  // editTodo,
  // deleteTodo,
  // changeTodoLabel,
  searchQuery,
  isSortEnabled,
}) => {
  const filtered = todos.filter(({ todoLabel }) => {
    return todoLabel.toLowerCase().includes(searchQuery);
  });

  const prepared = isSortEnabled
    ? [...filtered].sort((a, b) => a.todoLabel.localeCompare(b.todoLabel))
    : filtered;

  return prepared.length ? (
    <ul className={styles.list}>
      {prepared.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          // editTodo={editTodo}
          // deleteTodo={deleteTodo}
          // changeTodoLabel={changeTodoLabel}
        />
      ))}
    </ul>
  ) : (
    <p className={styles.empty}>Ничего не найдено.</p>
  );
};
