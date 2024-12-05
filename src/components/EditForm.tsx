// import { TodoType } from "../types";

interface EditFormPropsType {
    onCancel: (editMode:boolean) => void;
    editTodoTitle:string
    onChange:(event:any) => void;
  }

const EditForm = ({onCancel,editTodoTitle,onChange}:EditFormPropsType) => {
    return (
        <>
         <label htmlFor="editForm">編集中</label>
         <input type="text" id="editForm" onChange={onChange} value={editTodoTitle}/>
         <button>保存</button>
         <button onClick={()=>{onCancel(false)}}>キャンセル</button>
        </>
      )
    }

export default EditForm