// import {TodoType} from "../types"

interface InputFormPropsType {
    onChange:(event:any) => void;
    onAdd:(addTodo:any) => void;
    addTodoTitle:string
  }

  const InputForm = ({ onChange, onAdd, addTodoTitle }: InputFormPropsType) => {
    return (
      <>
        <div className="flex items-center justify-center mb-7 h-screen">
          {/* 入力フォームとボタンを横並びにするためにflexを使用 */}
          <div className="flex items-center justify-center">
            <label htmlFor="inputForm" className="mx-4">タイトル</label>
            <input
              type="text"
              id="inputForm"
              onChange={onChange}
              value={addTodoTitle}
              className="border-2 border-solid border-gray-400 rounded p-2"
            />
            <button
              onClick={() => { onAdd(addTodoTitle); }}
              className="bg-blue-500 text-white px-2 py-1 rounded ml-2" // ml-2で入力フォームとボタンの間に少しスペースを追加
            >
              追加
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default InputForm;
  