export default function Name(props) {
  const { name, pseudonym } = props;
  const style = {
    textTransform: "uppercase",
    textAlign: "right",
    paddingRight: "20px",
  };
  return (
    <div style={style}>
      <h1>{name}</h1>
      <h3>{pseudonym}</h3>
    </div>
  );
}
