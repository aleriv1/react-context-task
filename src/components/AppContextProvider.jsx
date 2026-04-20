import { TodosContext } from "./context";

export function AppContextProvider({ TodosValue, children }) {
  return (
    <>
      <TodosContext value={TodosValue}>{children}</TodosContext>
    </>
  );
}
