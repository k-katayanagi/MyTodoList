import { useState } from "react";
import InputForm from "./components/InputForm";
import EditForm from "./components/EditForm";
import { TodoType } from './types';

const App = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false); 
  const [addTodoTitle, setAddTodoTitle] = useState<string>(""); 
  const [editTodoTitle, setEditTodoTitle] = useState<string>(""); 
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const toggleEditMode = (editMode: boolean, todo?: TodoType): void => {
    setIsEditing(editMode);
    if (editMode && todo) {
      setEditTodoTitle(todo.title);  // 編集モード時にタイトルを設定
    } else {
      setEditTodoTitle("");  // 編集キャンセル時にタイトルをリセット
      setAddTodoTitle("");  // 入力フォームもリセット
    }
  };

  const handleChangeInputAddTodo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAddTodoTitle(event.target.value);
  };

  const handleChangeInputEditTodo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditTodoTitle(event.target.value);
  };

  const handleAddTodoList = (addTodoTitle: string): void => {
    const newId = Math.max(...todoList.map(todo => todo.id), 0) + 1;
    setTodoList([...todoList, { id: newId, title: addTodoTitle, state: "notStarted" }]);
  };

  const handleDeleteTodo = (deleteTodo: TodoType): void => {
    setTodoList(todoList.filter(todo => todo !== deleteTodo));
  };

  return (
    <div>
      {isEditing ? (
        <EditForm onCancel={toggleEditMode} editTodoTitle={editTodoTitle} onChange={handleChangeInputEditTodo} />
      ) : (
        <InputForm onAdd={handleAddTodoList} onChange={handleChangeInputAddTodo} addTodoTitle={addTodoTitle} />
      )}
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => toggleEditMode(true, todo)}>編集</button>
            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
