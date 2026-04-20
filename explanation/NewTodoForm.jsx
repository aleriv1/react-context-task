// Импорт необходимого хука React для работы со состоянием
import { useState } from "react";

// Импорт стилей для компонента формы добавления задачи
import styles from "./NewTodoForm.module.scss";

// Компонент NewTodoForm - форма для добавления новой задачи
// Принимает пропс:
// - addNewTodo: функция для добавления новой задачи
export const NewTodoForm = ({ addNewTodo }) => {
  // Состояние для хранения текста новой задачи (изначально пустая строка)
  const [todoLabel, setTodoLabel] = useState("");

  // Функция для обработки изменения текста в поле ввода
  const onNewTodoLableChange = (e) => {
    // Обновляем состояние текстом из поля ввода
    setTodoLabel(e.target.value);
  };

  // Функция для обработки отправки формы
  const onSubmit = (e) => {
    // Предотвращаем стандартное поведение формы (перезагрузка страницы)
    e.preventDefault();
    
    // Удаляем пробелы по краям текста
    const trimmedLabel = todoLabel.trim();

    // Если текст пустой - выходим из функции
    if (!trimmedLabel) {
      return;
    }

    // Вызываем функцию добавления новой задачи с очищенным текстом
    addNewTodo(trimmedLabel);
    
    // Очищаем поле ввода после добавления
    setTodoLabel("");
  };

  return (
    // Форма с классом из модуля стилей
    <form className={styles.form} onSubmit={onSubmit}>
      // Поле ввода для текста новой задачи
      <input
        type="text" // Тип поля - текст
        value={todoLabel} // Значение поля связано с состоянием
        onChange={onNewTodoLableChange} // Обработчик изменения
        placeholder="Что нужно сделать?" // Текст-подсказка
        className={styles.input} // Класс для стилизации
      />
      
      // Кнопка отправки формы
      <button 
        className={styles.submit} // Класс для стилизации
        type="submit" // Тип кнопки - отправляет форму
        disabled={!todoLabel.trim()} // Блокируем, если текст пустой
      >
        Добавить
      </button>
    </form>
  );
};
