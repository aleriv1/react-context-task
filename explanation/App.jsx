// Импорт необходимых хуков React для работы со состоянием и побочными эффектами
import { useEffect, useState } from "react";

// Импорт компонентов, используемых в приложении
import { TodoList } from "../TodoList/TodoList";
import styles from "./App.module.scss";
import { NewTodoForm } from "../NewTodoForm/NewTodoForm";
import { TodoSearch } from "../TodoSearch/TodoSearch";
import { TodoSortToggle } from "../TodoSortToggle/TodoSortToggle";

// Основной компонент приложения - функциональный компонент React
function App() {
  // Состояние для хранения списка задач (изначально пустой массив)
  const [todos, setTodos] = useState([]);
  
  // Состояние для отслеживания процесса загрузки данных
  const [isLoading, setIsLoading] = useState(false);
  
  // Состояние для хранения текущего текста поиска (ввод пользователя)
  const [searchQuery, setSearchQuery] = useState("");
  
  // Состояние для хранения "дебаунсированного" запроса (с задержкой)
  const [debouncedQuery, setDebouncedQuery] = useState("");
  
  // Состояние для включения/отключения сортировки задач
  const [isSortEnabled, setIsSortEnabled] = useState(false);

  // Первый useEffect: загрузка задач при монтировании компонента
  useEffect(() => {
    // Устанавливаем флаг загрузки в true
    setIsLoading(true);
    
    // Выполняем HTTP-запрос к серверу json-server для получения задач
    fetch("http://localhost:3002/todos")
      // Преобразуем ответ в формат JSON
      .then((response) => response.json())
      // Обновляем состояние todos полученными данными
      .then((responseTodo) => setTodos(responseTodo))
      // В любом случае (успех или ошибка) сбрасываем флаг загрузки
      .finally(() => setIsLoading(false));
  }, []); // Пустой массив зависимостей - эффект выполняется только при монтировании

  // Второй useEffect: реализация дебаунса для поиска
  useEffect(() => {
    // Создаем таймер с задержкой 400 мс
    const timeout = setTimeout(() => {
      // Обновляем дебаунсированный запрос, приводя ввод к нижнему регистру
      setDebouncedQuery(searchQuery.toLowerCase());
    }, 400);

    // Очистка таймера при изменении searchQuery или при размонтировании
    return () => clearTimeout(timeout);
  }, [searchQuery]); // Эффект срабатывает при изменении searchQuery

  // Функция для добавления новой задачи
  const addNewTodo = (todo) => {
    // Устанавливаем флаг загрузки
    setIsLoading(true);
    
    // Выполняем POST-запрос для создания новой задачи на сервере
    fetch("http://localhost:3002/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        id: Date.now(), // Уникальный ID на основе текущего времени
        todoLabel: todo, // Текст задачи
        editing: false, // Не в режиме редактирования
        completed: false, // Не выполнена
      }),
    })
      .then((response) => response.json())
      // Добавляем новую задачу в массив todos
      .then((responseTodo) => {
        setTodos((prevTodos) => [...prevTodos, responseTodo]);
      })
      .finally(() => setIsLoading(false));
  };

  // Функция для переключения режима редактирования задачи
  const editTodo = (id, editingState) => {
    // Выполняем PATCH-запрос для обновления флага editing
    fetch(`http://localhost:3002/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        editing: editingState, // Новое состояние редактирования
      }),
    })
      .then((response) => response.json())
      // Обновляем состояние, находя задачу по ID и обновляя её флаг editing
      .then((responseTodo) =>
        setTodos((prevTodos) => {
          return prevTodos.map((todo) => {
            return todo.id === responseTodo.id
              ? { ...todo, editing: responseTodo.editing }
              : todo;
          });
        }),
      );
  };

  // Функция для изменения текста задачи
  const changeTodoLabel = (id, todoLabelInput) => {
    // Выполняем PATCH-запрос для обновления текста задачи
    fetch(`http://localhost:3002/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        todoLabel: todoLabelInput, // Новый текст задачи
        editing: false, // Выходим из режима редактирования
      }),
    })
      .then((resp) => resp.json())
      // Обновляем состояние, находя задачу по ID и обновляя её текст и флаг editing
      .then((respTodo) => {
        setTodos((prevTodos) => {
          return prevTodos.map((todo) => {
            return todo.id === respTodo.id
              ? {
                  ...todo,
                  todoLabel: respTodo.todoLabel,
                  editing: respTodo.editing,
                }
              : todo;
          });
        });
      });
  };

  // Функция для удаления задачи
  const deleteTodo = (id) => {
    // Выполняем DELETE-запрос для удаления задачи
    fetch(`http://localhost:3002/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      // Удаляем задачу из массива todos по ID
      .then(() => {
        setTodos((prevTodos) => {
          return prevTodos.filter((todo) => {
            return todo.id !== id;
          });
        });
      });
  };

  // Возвращаем JSX-разметку приложения
  return (
    <div className={styles.app}>
      <div className={styles.card}>
        <h1 className={styles.header}>todoS json-server</h1>
        
        {/* Форма добавления новой задачи */}
        <NewTodoForm addNewTodo={addNewTodo} />
        
        {/* Условная отрисовка: если идет загрузка - показываем лоадер */}
        {isLoading ? (
          <div
            className={styles.loader}
            aria-label="Загрузка"
            role="status"
          ></div>
        ) : (
          <>
            {/* Список задач с передачей всех необходимых функций */}
            <TodoList
              todos={todos}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              changeTodoLabel={changeTodoLabel}
              searchQuery={debouncedQuery} // Используем дебаунсированный запрос
              isSortEnabled={isSortEnabled}
            />
            
            {/* Панель управления: поиск и сортировка */}
            <div className={styles.controlsRow}>
              <TodoSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <TodoSortToggle
                isSortEnabled={isSortEnabled}
                onToggle={() => setIsSortEnabled((prev) => !prev)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Экспорт компонента по умолчанию
export default App;
