import Skill from "./Skill.js";

export default function SkillList(props) {
  const { skills, colors } = props;
  const style = {
    display: "flex",
    flexFlow: "row",
    flexWrap: "wrap",
    position: "relative",
    bottom: 0,
  };
  const skillComponents = [];
  for (let i = 0; i < skills.length; ++i) {
    skillComponents.push(<Skill skill={skills[i]} color={colors[i]} />);
  }
  return <div style={style}>{skillComponents}</div>;
}
