export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>No items on the list.</em>
      </footer>
    );

  const itemCount = items.length;
  const packedCount = items.filter((elem) => elem.packed).length;

  return (
    <footer className="stats">
      <em>
        {itemCount !== packedCount
          ? `You have ${itemCount} item${
              itemCount !== 1 ? "s" : ""
            } on your list and
        you've packed
        ${itemCount !== 0 ? Math.floor((packedCount / itemCount) * 100) : 100}%
        of them.`
          : `You've packed everything! Ready to go! ✈️`}
      </em>
    </footer>
  );
}
