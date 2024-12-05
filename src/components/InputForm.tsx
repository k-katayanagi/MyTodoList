// import {TodoType} from "../types"

interface InputFormPropsType {
    onChange:(event:any) => void;
    onAdd:(addTodo:any) => void;
    addTodoTitle:string
  }

const InputForm = ({onChange,onAdd,addTodoTitle}:InputFormPropsType) => {
    return (
        <>
         <label htmlFor="inputForm">タイトル</label>
         <input type="text" id="inputForm" onChange={onChange} value={addTodoTitle}/>
         <button onClick={()=>{onAdd(addTodoTitle)}}>追加</button>
        </>
      )
    }


export default InputForm