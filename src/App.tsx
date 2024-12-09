import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
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
  }, [selectSortState,todoList]); // selectSortStateが変更されるたびに実行される

  const toggleEditMode = (editMode: boolean, todo?: TodoType): void => {
    setIsEditing(editMode);
    if (editMode && todo) {
      setEditTodo(todo);
    } else {
      setEditTodo(null);
      setAddTodoTitle("");
    }
  };

  //｛handleChangeInputAddTodo｝と｛handleChangeInputEditTodo｝共通化
  const handleChangeInputTodo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedTitle = event.target.value;
    if (editTodo) {
      setEditTodo({ ...editTodo, title: updatedTitle });
    } else {
      setAddTodoTitle(updatedTitle);
    }
  };

  //｛handleAddEditTodoList｝と｛ handleAddTodoList｝共通化
  const handleAddTodoList = (addTodoTitle?: string, editTodo?: TodoType | null):void=> {
    if (addTodoTitle?.length === 0 && editTodo?.title?.length === 0) {
      alert("TODOを入力してください");
      return;
    }

    if (editTodo) {
    // 編集の場合
      const updatedTodoList = todoList.map((todo) =>
      todo.id === editTodo.id ? { ...todo, title: editTodo.title, state: editTodo.state } : todo
    );
      setTodoList(updatedTodoList);
      //保存メッセージ表示のタイムアウト処理
      setIsEditingDone(true);
      setTimeout(() => {
      setIsEditingDone(false);
      }, 2000);
    } else {
    // 新規追加の場合
      const newId = Math.max(...todoList.map(todo => todo.id), 0) + 1;
      setTodoList([...todoList, { id: newId, title: addTodoTitle, state: "未完了" }]);
    }
    // 編集モードの終了処理
    setIsEditing(false);
    setEditTodo(null);
  
  };



    const handleUpdateTodoState = (updatedTodo: TodoType): void => {
    setEditTodo(updatedTodo);
    };

    const handleDeleteTodo = (deleteTodo: TodoType): void => {
    setTodoList(todoList.filter(todo => todo.id !== deleteTodo.id));
  };


  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-pink-300 via-orange-200 to-yellow-200">
      <div className="flex flex-col items-start justify-center bg-white p-8 rounded shadow-lg w-full max-w-[1300px] mt-10">
        <div className="flex w-full items-center">
          <div className="flex w-full justify-center items-start space-x-4"> 
            <StateSortOption onChangeState={handleUpdateSortState} />
            {isEditing ? (
            <EditForm
            onCancel={toggleEditMode}
            editTodo={editTodo}
            onChange={handleChangeInputTodo}
            addeditTodo={handleAddTodoList}
            updateState={handleUpdateTodoState}
            />
            ) : (
            <InputForm
            onAdd={handleAddTodoList}
            onChange={handleChangeInputTodo}
            addTodoTitle={addTodoTitle}
            />
            )}
          </div>
      </div>
        {isEditingDone && (
        <div className="flex justify-center w-full">
          <p className="text-red-500 font-bold">保存しました</p>
        </div>
        )}
        <TodoList todos={sortTodoList} onEdit={toggleEditMode} onDelete={handleDeleteTodo} />
      </div>
    </div>
  );
};

export default App;