import { useEffect, useState } from "react";
import InputForm from "./components/InputForm";
import EditForm from "./components/EditForm";
import StateSortOption from "./components/StateSortOption";
import { TodoType } from './types';

const App = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false); 
  const [addTodoTitle, setAddTodoTitle] = useState<string>(""); 
  const [editTodo, setEditTodo] = useState<TodoType | null>(null); 
  const [todoList, setTodoList] = useState<TodoType[]>([]); 
  const [sortTodoList, setSortTodoList] = useState<TodoType[]>([]); // ソートされたTodoリストを管理
  const [isEditingDone, setIsEditingDone] = useState<boolean>(false); 
  const [selectSortState, setSelectSortState] = useState<string>("すべて");

  const handleUpdateSortState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectSortState(event.target.value);
  };

  // selectSortStateが変更されたときに、sortTodoListを更新する
  useEffect(() => {
    const sortedTodos = [...todoList];
    
    switch (selectSortState) {
      case '未完了':
        setSortTodoList(sortedTodos.filter((todo) => todo.state === '未完了'));
        break;
      case '進行中':
        setSortTodoList(sortedTodos.filter((todo) => todo.state === '進行中'));
        break;
      case '完了':
        setSortTodoList(sortedTodos.filter((todo) => todo.state === '完了'));
        break;
      default:
        setSortTodoList(sortedTodos);
        break;
    }
  }, [selectSortState,todoList]); // selectSortState`が変更されるたびに実行される

  const toggleEditMode = (editMode: boolean, todo?: TodoType): void => {
    setIsEditing(editMode);
    if (editMode && todo) {
      setEditTodo(todo);
    } else {
      setEditTodo(null);
      setAddTodoTitle("");
    }
  };

  const handleUpdateTodoState = (updatedTodo: TodoType): void => {
    setEditTodo(updatedTodo);
  };

  const handleChangeInputAddTodo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAddTodoTitle(event.target.value);
  };

  const handleChangeInputEditTodo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const editTodoTitle = event.target.value;
    if (editTodo) {
      setEditTodo({ ...editTodo, title: editTodoTitle });
    }
  };

  const handleAddTodoList = (addTodoTitle: string): void => {
    if (addTodoTitle.length === 0) {
      alert("TODOを入力してください");
      return;
    }
    const newId = Math.max(...todoList.map(todo => todo.id), 0) + 1;
    setTodoList([...todoList, { id: newId, title: addTodoTitle, state: "未完了" }]);
    setAddTodoTitle("");
  };

  const handleDeleteTodo = (deleteTodo: TodoType): void => {
    setTodoList(todoList.filter(todo => todo.id !== deleteTodo.id));
  };

  const handleAddEditTodoList = (editTodo: TodoType | null): void => {
    if (!editTodo || editTodo.title.length === 0) {
      alert("TODOを入力してください");
      return;
    }

    const updatedTodoList = todoList.map((todo) =>
      todo.id === editTodo.id ? { ...todo, title: editTodo.title, state: editTodo.state } : todo
    );

    setTodoList(updatedTodoList);
    setIsEditing(false);
    setEditTodo(null);
    setIsEditingDone(true);
    setTimeout(() => {
      setIsEditingDone(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded shadow-lg w-[800px]">
        <div className="flex items-center justify-center w-full mb-10"> {/* 横並びでスペースを調整 */}
          {isEditing ? (
            <EditForm
              onCancel={toggleEditMode}
              editTodo={editTodo}
              onChange={handleChangeInputEditTodo}
              addeditTodo={handleAddEditTodoList}
              updateState={handleUpdateTodoState}
            />
          ) : (
            <InputForm onAdd={handleAddTodoList} onChange={handleChangeInputAddTodo} addTodoTitle={addTodoTitle} />
          )}
          
          {/* ステータスソートオプションを横並びに配置 */}
          <StateSortOption onChangeState={handleUpdateSortState} />
        </div>
        {isEditingDone ? <p>保存しました</p> : null}
        <ul className="p-0 mt-4">
          {sortTodoList.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center py-2">
              <span>{todo.title}</span>
              <span>{todo.state}</span>
              <button onClick={() => toggleEditMode(true, todo)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">編集</button>
              <button onClick={() => handleDeleteTodo(todo)} className="bg-red-500 text-white px-2 py-1 rounded">削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
