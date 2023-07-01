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
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <Pizza pizza={0} />
      <Pizza pizza={1} />
      <Pizza pizza={2} />
      <Pizza pizza={3} />
      <Pizza pizza={4} />
      <Pizza pizza={5} />
    </main>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHours = 12;
  const closeHours = 22;
  const isOpen = openHours < hour && closeHours > hour;
  return (
    <footer className="footer">
      It's {new Date().toLocaleTimeString()}.{" "}
      {isOpen
        ? "We're currently open!"
        : "We're closed now, but we open at 12:00PM tomorrow!"}
    </footer>
  );
}

function Pizza(props) {
  const { name, ingredients, price, photoName, soldOut } =
    pizzaData[props.pizza];
  return (
    <div>
      <img alt={name} src={photoName} width="200" height="200" />
      <h3>
        {name}{" "}
        {soldOut ? <span style={{ color: "red" }}>SOLD OUT!</span> : null}
      </h3>
      <p>
        {ingredients} <strong>{price}</strong>
      </p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
