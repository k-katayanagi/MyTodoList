// import { StateSortType } from "../types";

interface StateSortOptionType {
  onChangeState: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StateSortOption = ({ onChangeState }: StateSortOptionType) => {
  const stateSortOptionList = [
    { state: "すべて" },
    { state: "未完了" },
    { state: "進行中" },
    { state: "完了" },
  ];

  return (
    <>
      <select
        onChange={(event) => {
          onChangeState(event);
        }}
        className="border-2 border-solid border-gray-400 rounded p-2 ml-9"
      >
        {stateSortOptionList.map((item) => (
          <option value={item.state} key={item.state}>
            {item.state}
          </option>
        ))}
      </select>
    </>
  );
};

export default StateSortOption;
