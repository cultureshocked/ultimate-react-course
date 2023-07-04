import Friend from "./Friend";

export default function FriendsList({ friends, selected, setSelected }) {
  return (
    <ul>
      {friends.map((elem) => (
        <Friend
          friend={elem}
          key={elem.id}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </ul>
  );
}
