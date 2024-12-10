import { TodoType } from "../types";

interface TodoListType {
  todos: TodoType[];
  onEdit: (editMode: boolean, todo?: TodoType) => void;
  onDelete: (deleteTodo: TodoType) => void;
}

const TodoList = ({ todos, onEdit, onDelete }: TodoListType) => {
  if (todos.length === 0) {
    return (
      <div className="flex justify-center items-center py-2 w-full">
        <p>TODOがありません</p>
      </div>
    );
  }
  return (
    <ul className="p-0 mt-2 w-full">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center py-2 border-b"
        >
          <span className="flex-1">{todo.title}</span>
          <span className="mx-2">{`:${todo.state}`}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(true, todo)}
              className="bg-[#34d399] text-white px-2 py-1 rounded"
            >
              編集
            </button>
            <button
              onClick={() => onDelete(todo)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
