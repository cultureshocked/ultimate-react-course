import Avatar from "./Avatar.js";
import SkillList from "./SkillList.js";
import Intro from "./Intro.js";
import Name from "./Name.js";

export default function App() {
  const style = {
    width: "500px",
    height: "auto",
    border: "solid 4px black",
    fontFamily: "monospace",
  };
  const avatarPath = "./aesir.jpg";
  const text =
    "An experienced Ruby and C developer who is diving into the world of React for front-end interfaces.";
  const skillsList = [
    "Ruby",
    "C",
    "Rails",
    "Algorithms",
    "Data Structures",
    "Administration",
    "Arch Linux",
    "Rust",
  ];
  const colorsList = [
    "#AA1111",
    "#0033EF",
    "#118FEE",
    "#555555",
    "#555555",
    "#117711",
    "#0033EF",
    "#DD9900",
  ];
  return (
    <div style={style} className="card">
      <Avatar path={avatarPath} />
      <Name name="Conrad Fitzgerald" pseudonym="no_god_complex" />
      <Intro text={text} />
      <SkillList skills={skillsList} colors={colorsList} />
    </div>
  );
}
