import { TodoType } from "../types";

interface StateOptionProps {
  onChangeState: (stateValue: TodoType['state']) => void;
  currentState:"未完了"|"進行中"|"完了"
}

const StateOption = ({ onChangeState }: StateOptionProps) => {
  const StateOptionList = [
    { state: "未完了" },
    { state: "進行中" },
    { state: "完了" }
  ];

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // 選択された状態を親に通知
    onChangeState(event.target.value as TodoType['state']);
  };

  return (
    <select onChange={handleStateChange}>
      {StateOptionList.map((item) => (
        <option key={item.state} value={item.state}>
          {item.state}
        </option>
      ))}
    </select>
  );
};

export default StateOption;
