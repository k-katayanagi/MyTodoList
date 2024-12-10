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
      <label htmlFor="editForm">編集中</label>
      <input
        type="text"
        id="editForm"
        onChange={onChange}
        value={editTodo?.title}
      />
      {/* StateOptionコンポーネントに状態変更を渡す */}
      <StateOption onChangeState={handleChangeTodoState} 
       currentState={todoState}/>
      <button onClick={() => { addeditTodo(editTodo); }}>保存</button>
      <button onClick={() => { onCancel(false); }}>キャンセル</button>
    </>
  );
};

export default EditForm;
