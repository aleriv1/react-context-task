// Импорт необходимых хуков React для работы со состоянием и побочными эффектами
import { useEffect, useState } from "react";

// Импорт стилей для компонента задачи
import styles from "./Todo.module.scss";

// Компонент Todo - отображает одну задачу
// Принимает следующие пропсы:
// - todoLabel: текст задачи
// - id: уникальный идентификатор задачи
// - editing: флаг, находится ли задача в режиме редактирования
// - editTodo: функция для переключения режима редактирования
// - deleteTodo: функция для удаления задачи
// - changeTodoLabel: функция для изменения текста задачи
export const Todo = ({
  todoLabel,
  id,
  editing,
  editTodo,
  deleteTodo,
  changeTodoLabel,
}) => {
  // Состояние для хранения текста задачи при редактировании
  // Инициализируется значением из пропса todoLabel
  const [todoLabelInput, setTodoLabelInput] = useState(todoLabel);

  // useEffect для синхронизации состояния с пропсами
  // При изменении todoLabel (например, после обновления с сервера)
  // обновляем значение в поле ввода
  useEffect(() => {
    setTodoLabelInput(todoLabel);
  }, [todoLabel]); // Зависит только от todoLabel

  // Функция для обработки отправки формы редактирования
  const onSubmit = (e) => {
    // Предотвращаем стандартное поведение формы
    e.preventDefault();
    
    // Удаляем пробелы по краям текста
    const trimmedValue = todoLabelInput.trim();

    // Если текст пустой - выходим из функции
    if (!trimmedValue) {
      return;
    }

    // Вызываем функцию изменения текста задачи
    changeTodoLabel(id, trimmedValue);
  };

  // Функция для обработки изменения текста в поле ввода
  const onTodoLabelChange = (e) => {
    // Обновляем состояние текстом из поля ввода
    setTodoLabelInput(e.target.value);
  };

  // Функция для переключения режима редактирования
  const toggleEditing = () => {
    // Вызываем функцию editTodo с противоположным значением editing
    editTodo(id, !editing);
  };

  return (
    // Элемент списка с динамическим классом для режима редактирования
    <li className={`${styles.todoItem} ${editing ? styles.editing : ""}`}>
      {/* Если режим редактирования выключен - отображаем задачу */}
      {!editing ? (
        <div className={styles.todoLabel}>
          {/* Текст задачи */}
          <p>{todoLabel}</p>
          
          {/* Контейнер для кнопок действий */}
          <div className={styles.actions}>
            {/* Кнопка редактирования */}
            <button
              className={`${styles.icon} ${styles["icon-edit"]}`}
              // Добавляем дополнительный класс для стилизации кнопки редактирования
              onClick={toggleEditing} // Переключаем режим редактирования
              type="button"
            >
              Редактировать
            </button>
            
            {/* Кнопка удаления */}
            <button
              className={styles.icon}
              onClick={() => deleteTodo(id)} // Удаляем задачу
              type="button"
            >
              Удалить
            </button>
          </div>
        </div>
      ) : (
        {/* Если режим редактирования включен - отображаем форму редактирования */}
        <form className={styles.todoEdit} onSubmit={onSubmit}>
          {/* Поле ввода для редактирования текста */}
          <input
            type="text"
            value={todoLabelInput} // Связано с состоянием
            onChange={onTodoLabelChange} // Обработчик изменения
            className={styles.editInput} // Класс для стилизации
            autoFocus // Автоматический фокус при редактировании
          />
          
          {/* Контейнер для кнопок действий при редактировании */}
          <div className={styles.editActions}>
            {/* Кнопка сохранения */}
            <button className={styles.save} type="submit">
              Сохранить
            </button>
            
            {/* Кнопка отмены редактирования */}
            <button className={styles.cancel} type="button" onClick={toggleEditing}>
              Отменить
            </button>
          </div>
        </form>
      )}
    </li>
  );
};
