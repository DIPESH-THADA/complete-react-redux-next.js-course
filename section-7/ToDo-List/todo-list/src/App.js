import { useState } from "react";

const initialItems = [
  { id: 1, description: "Buy groceries", done: false },
  { id: 2, description: "Walk the dog", done: true },
  { id: 3, description: "Read a book", done: false },
];

function App() {
  const [items, setItems] = useState(initialItems);

  const handleToggleItems = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const handleClearItems = () => {
    setItems(items.filter((item) => !item.done));
  };

  return (
    <div className="App">
      <Logo />
      <Form />
      <List
        items={items}
        onToggleItems={handleToggleItems}
        onClearItems={handleClearItems}
      />
    </div>
  );
}

function Logo() {
  return <h1>To Do List 📝</h1>;
}

function Form() {
  return (
    <form className="add-form">
      <input type="text" placeholder="Add new task..." />
      <button type="submit">Add</button>
    </form>
  );
}

function List({ items, onToggleItems, onClearItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => onToggleItems(item.id)}
            />
            <span style={{ textDecoration: item.done ? "line-through" : "" }}>
              {item.description}
            </span>
          </li>
        ))}
      </ul>
      <button onClick={onClearItems}>Clear Completed</button>
    </div>
  );
}
export default App;
