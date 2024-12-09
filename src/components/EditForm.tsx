import { useState } from "react";
import { TodoType } from "../types";
import StateOption from "./StateOption";

interface EditFormPropsType {
  onCancel: (editMode: boolean) => void;
  editTodo: TodoType | null;
  onChange: (event: any) => void;
  addeditTodo: (editTodo: TodoType | null) => void;
  updateState: (updatedTodo: TodoType) => void;
}

const EditForm = ({
  onCancel,
  editTodo,
  onChange,
  addeditTodo,
  updateState
}: EditFormPropsType) => {
  // 編集中のTODOの状態を管理
  const [todoState, setTodoState] = useState<TodoType["state"]>(editTodo!.state);

  const handleChangeTodoState = (currentState: TodoType["state"]) => {
    // 状態が変わったときにその状態を更新する
    setTodoState(currentState);  // 親で状態を管理
    if (editTodo) {
      // 編集中のtodoを更新
      updateState({ ...editTodo, state: currentState });
    }
  };

  return (
    <>
    <div className="flex items-start justify-center mb-7">
      <div className="flex items-start justify-center m-">
        <label htmlFor="editForm" className="flex items-center h-[40px] mx-4 ">編集中</label>
        <input
        type="text"
        id="editForm"
        onChange={onChange}
        value={editTodo?.title}
        className="border-2 border-solid border-gray-400 rounded p-2 h-[40px]"
        />
        {/* StateOptionコンポーネントに状態変更を渡す */}
        <StateOption onChangeState={handleChangeTodoState} />
        <button 
        onClick={() => { addeditTodo(editTodo); }}
        className="bg-blue-500 text-white px-2 py-1 rounded mx-2">保存</button>
        <button 
        onClick={() => { onCancel(false); }}
        className="bg-red-500 text-white px-2 py-1 rounded mx-2">キャンセル</button>
      </div>
    </div>
    </>
  );
};

export default EditForm;
