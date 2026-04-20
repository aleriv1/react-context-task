// Импорт стилей для компонента поиска
import styles from "./TodoSearch.module.scss";

// Компонент TodoSearch - поле ввода для поиска задач
// Принимает следующие пропсы:
// - searchQuery: текущий текст поиска
// - onSearchChange: функция для обновления текста поиска
export const TodoSearch = ({ searchQuery, onSearchChange }) => {
  return (
    // Контейнер с классом из модуля стилей
    <label className={styles.wrapper}>
      {/* Скрытый элемент для доступности (aria-label в App.jsx) */}
      <span className={styles.label}></span>
      
      {/* Поле ввода для поиска задач */}
      <input
        type="text" // Тип поля - текст
        value={searchQuery} // Значение поля связано с пропсом searchQuery
        onChange={(e) => onSearchChange(e.target.value)} // При изменении вызываем функцию обновления
        placeholder="Найти задачу" // Текст-подсказка
        className={styles.input} // Класс для стилизации
      />
    </label>
  );
};
