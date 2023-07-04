import Button from "./Button";
import { useState } from "react";

export default function FormSplitBill({ friend, updateBalance }) {
  const [userExpense, setUserExpense] = useState(0);
  const [bill, setBill] = useState(0);
  const [payer, setPayer] = useState(0);

  const update = (e) => {
    e.preventDefault();
    if (!bill || !userExpense) return;
    updateBalance(payer === 0 ? userExpense : -userExpense);
  };

  return (
    <form className="form-split-bill" onSubmit={update}>
      <h2>Split a bill with {friend.name}</h2>

      <label>💵 Bill value </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🪙 Your expense </label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) => setUserExpense(Number(e.target.value))}
      />

      <label>🪙 {friend.name}'s expense </label>
      <input type="text" disabled value={bill - userExpense} />

      <label>💰 Who's paying? </label>
      <select value={payer} onChange={(e) => setPayer(Number(e.target.value))}>
        <option value={0}>You</option>
        <option value={1}>{friend.name}</option>
      </select>

      <Button onClick={null}>Split Bill</Button>
    </form>
  );
}
