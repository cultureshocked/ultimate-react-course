import { useState } from "react";
// import Item from "./Item";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };
  const deleteItem = (id) => {
    setItems((i) => {
      return i.filter((elem) => elem.id !== id);
    });
  };
  const togglePacked = (id) => {
    setItems((i) => {
      return items.map((elem) => {
        return elem.id === id ? { ...elem, packed: !elem.packed } : elem;
      });
    });
  };
  const clearList = () => {
    const confirmed = window.confirm("Are you sure you want to clear?");
    if (confirmed) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form updateItems={handleAddItems} />
      <PackingList
        items={items}
        deleteItem={deleteItem}
        togglePacked={togglePacked}
        clearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}
