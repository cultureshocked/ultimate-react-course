import Button from "./Button";

export default function Friend({ friend, selected, setSelected }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance === 0 ? (
        <p>You and {friend.name} are even.</p>
      ) : friend.balance < 0 ? (
        <p className="red">
          <b>
            You owe {friend.name} ${Math.abs(friend.balance)}
          </b>
        </p>
      ) : (
        <p className="green">
          <b>
            {friend.name} owes you ${friend.balance}
          </b>
        </p>
      )}

      <Button onClickHandler={() => setSelected(friend)}>
        {friend === selected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
