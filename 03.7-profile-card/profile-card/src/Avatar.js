export default function Avatar(props) {
  const { path } = props;
  const style = {
    width: "100%",
    height: "auto",
  };
  return <img alt="Avatar" src={path} style={style} />;
}
