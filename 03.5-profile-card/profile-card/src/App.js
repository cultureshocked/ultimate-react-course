import Card from "./Card.js";

export default function App() {
  const data = {
    name: "Conrad Fitzgerald",
    pseudonym: "no_god_complex",
    catchphrase: "Salvus Silente",
    technologies: ["ruby", "c", "react"],
  };
  return (
    <div>
      <Card avatar="./aesir.jpg" data={data} />
    </div>
  );
}
