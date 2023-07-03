export default function Result({ bill, tip }) {
  return (
    <div>
      <h3>
        Your total will be ${(bill + tip).toFixed(2)} (${bill.toFixed(2)} + $
        {tip.toFixed(2)} tip)
      </h3>
    </div>
  );
}
