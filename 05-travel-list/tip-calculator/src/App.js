import { useState } from "react";
import Result from "./Result";
import ControlledInput from "./ControlledInput";

export default function App() {
  const [bill, setBill] = useState(0);
  const [satisfaction, setSatisfaction] = useState([0, 0]);

  const setSelf = (e) => {
    setSatisfaction((arr) => {
      return arr.map((elem, i) => {
        return i === 0 ? Number(e.target.value) : elem;
      });
    });
  };

  const setFriend = (e) => {
    setSatisfaction((arr) => {
      return arr.map((elem, i) => {
        return i === 1 ? Number(e.target.value) : elem;
      });
    });
  };

  const setBillFromInput = (e) => {
    setBill(Number(e.target.value));
  };

  const resetState = () => {
    setBill(0);
    setSatisfaction([0, 0]);
  };

  return (
    <>
      <ControlledInput>
        <label>How much was the bill? </label>
        <input type="text" value={bill} onChange={setBillFromInput} />
      </ControlledInput>
      <br></br>
      <ControlledInput>
        <label>How much did you like the service? </label>
        <select value={satisfaction[0]} onChange={setSelf}>
          <option value={0}>Bad (0%)</option>
          <option value={0.05}>Okay (5%)</option>
          <option value={0.1}>Good (10%)</option>
          <option value={0.2}>Awesome! (20%)</option>
        </select>
      </ControlledInput>
      <br></br>
      <ControlledInput>
        <label>How much did your friend like the service? </label>
        <select value={satisfaction[1]} onChange={setFriend}>
          <option value={0}>Bad (0%)</option>
          <option value={0.05}>Okay (5%)</option>
          <option value={0.1}>Good (10%)</option>
          <option value={0.2}>Awesome! (20%)</option>
        </select>
      </ControlledInput>
      <br></br>
      <Result
        bill={bill}
        tip={((satisfaction[0] + satisfaction[1]) / 2) * bill}
      />
      <button onClick={resetState}>Reset</button>
    </>
  );
}
