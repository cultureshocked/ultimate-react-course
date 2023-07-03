import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  deleteItem,
  togglePacked,
  clearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  const handleSortSelect = (e) => {
    setSortBy(e.target.value);
  };

  let sortedArray;

  switch (sortBy) {
    case "input":
      sortedArray = items;
      break;
    case "description":
      sortedArray = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
      break;
    case "packed":
      sortedArray = items
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed));
      break;
    default:
      throw Error("Invalid sort state?");
  }

  return (
    <div className="list">
      <ul>
        {sortedArray.map((elem) => {
          return (
            <Item
              item={elem}
              key={elem.id}
              deleteItem={deleteItem}
              togglePacked={togglePacked}
            />
          );
        })}
      </ul>

      <div>
        <select value={sortBy} onChange={handleSortSelect}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by name</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={clearList}>Clear list</button>
      </div>
    </div>
  );
}
