import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App";
//import "./index.css";
import StarRating from "./StarRating";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "OK", "Good", "Amazing"]}
    />
    <StarRating size={24} color="red" maxRating={10} defaultRating={3} />
  </React.StrictMode>
);
