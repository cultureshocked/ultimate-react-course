export default function Intro(props) {
  const { text } = props;
  const style = {
    padding: "15px",
  };
  return <p style={style}>{text}</p>;
}
