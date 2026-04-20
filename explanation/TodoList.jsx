// Импорт компонента Todo и стилей
import { Todo } from "../Todo/Todo";
import styles from "./TodoList.module.scss";

// Компонент TodoList - отображает список задач
// Принимает следующие пропсы:
// - todos: массив задач
// - editTodo: функция для переключения режима редактирования
// - deleteTodo: функция для удаления задачи
// - changeTodoLabel: функция для изменения текста задачи
// - searchQuery: строка поиска (дебаунсированная)
// - isSortEnabled: флаг включения сортировки
export const TodoList = ({
  todos,
  editTodo,
  deleteTodo,
  changeTodoLabel,
  searchQuery,
  isSortEnabled,
}) => {
  // Фильтрация задач: оставляем только те, текст которых содержит searchQuery
  // Приводим оба текста к нижнему регистру для регистронезависимого поиска
  const filtered = todos.filter(({ todoLabel }) => {
    return todoLabel.toLowerCase().includes(searchQuery);
  });

  // Подготовка списка задач для отображения
  // Если сортировка включена, сортируем отфильтрованные задачи по алфавиту
  // Используем localeCompare для корректного сравнения строк
  const prepared = isSortEnabled
    ? [...filtered].sort((a, b) => a.todoLabel.localeCompare(b.todoLabel))
    : filtered;

  // Условная отрисовка
  // Если в подготовленном списке есть задачи - отрисовываем их
  return prepared.length ? (
    // Список задач с классом из модуля стилей
    <ul className={styles.list}>
      // Проходим по каждой задаче и отрисовываем компонент Todo
      {prepared.map((todo) => (
        <Todo
          key={todo.id} // Уникальный ключ для React списка
          {...todo} // Распаковываем все свойства задачи (todoLabel, id, editing, completed)
          editTodo={editTodo} // Передаем функцию редактирования
          deleteTodo={deleteTodo} // Передаем функцию удаления
          changeTodoLabel={changeTodoLabel} // Передаем функцию изменения текста
        />
      ))}
    </ul>
  ) : (
    // Если задач нет - показываем сообщение об отсутствии результатов
    <p className={styles.empty}>Ничего не найдено.</p>
  );
};
