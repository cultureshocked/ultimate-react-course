import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {pizzas.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. Six creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza entry={pizza} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please check back soon!</p>
      )}
    </main>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHours = 11;
  const closeHours = 22;
  const isOpen = openHours < hour && closeHours > hour;
  return (
    <footer className="footer">
      {isOpen ? <Order c={closeHours} /> : <Closed o={openHours} />}
    </footer>
  );
}

function Order(props) {
  return (
    <div className="order">
      <p>We're open until {props.c}:00! Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  );
}

function Closed(props) {
  return (
    <p>
      Sorry, we're closed until {props.o}:00. We're happy to take your order
      then.
    </p>
  );
}

function Pizza(props) {
  const { name, ingredients, price, photoName, soldOut } = props.entry;
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img alt={name} src={photoName} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <strong>{soldOut ? "SOLD OUT" : price}</strong>
      </div>
    </li>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
