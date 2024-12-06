// import { StateSortType } from "../types";

interface StateSortOptionType {
  onChangeState: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }

const StateSortOption = ({onChangeState}:StateSortOptionType) => {
    const stateSortOptionList = [
      {state:"すべて"},
      {state:"未完了"},
      {state:"進行中"},
      {state:"完了"}
    ]

    return (
        <>
        <div>
        <select onChange={(event)=>{onChangeState(event)}}>
            {
              stateSortOptionList.map((item)=>(
              <option value={item.state} key={item.state}>{item.state}</option>))
            }
        </select>
        </div>
        </>
      )
    }


export default StateSortOption
