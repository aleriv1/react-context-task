// Импорт стилей для компонента переключателя сортировки
import styles from "./TodoSortToggle.module.scss";

// Компонент TodoSortToggle - кнопка для включения/отключения сортировки задач
// Принимает следующие пропсы:
// - isSortEnabled: флаг включения сортировки
// - onToggle: функция для переключения состояния сортировки
export const TodoSortToggle = ({ isSortEnabled, onToggle }) => {
  return (
    // Кнопка переключения сортировки
    <button
      type="button" // Тип кнопки - не отправляет форму
      className={`${styles.button} ${isSortEnabled ? styles.buttonActive : ""}`}
      // Динамически добавляем класс buttonActive, если сортировка включена
      onClick={onToggle} // Обработчик клика - вызывает функцию переключения
    >
      // Условный текст кнопки в зависимости от состояния сортировки
      {isSortEnabled ? "Сортировка А→Я" : "Без сортировки"}
    </button>
  );
};
