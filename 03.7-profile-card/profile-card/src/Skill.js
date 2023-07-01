export default function Skill(props) {
  const { skill, color } = props;
  const style = {
    backgroundColor: color,
    color: "white",
    fontSize: "14px",
    fontWeight: 900,
    padding: "7px",
    margin: "5px",
    borderRadius: "5px",
  };
  return <div style={style}>{skill}</div>;
}
