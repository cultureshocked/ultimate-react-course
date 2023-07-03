export default function Item({ item, deleteItem, togglePacked }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => togglePacked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => deleteItem(item.id)}>❌</button>
    </li>
  );
}
