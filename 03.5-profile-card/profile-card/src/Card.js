export default function Card(props) {
  const { avatar, data } = props;
  const { name, pseudonym, technologies } = data;

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row",
        border: "solid black 2px",
        borderRadius: "6px",
        boxShadow: "#333 3px 3px 3px 3px",
        width: "500px",
        padding: "10px",
      }}
    >
      <div>
        <img src={avatar} alt="avatar" width="200" height="200" />
      </div>
      <div style={{ padding: "5px" }}>
        <h2 style={{ textTransform: "uppercase" }}>{name}</h2>
        <p
          style={{
            position: "relative",
            fontSize: "12px",
            fontWeight: "300",
            top: "-25px",
            textAlign: "right",
          }}
        >
          {pseudonym}
        </p>
        <Information technologies={technologies} />
      </div>
    </div>
  );
}

function Information(props) {
  const technologySpans = [];
  for (let i = 0; i < props.technologies.length; ++i) {
    technologySpans.push(
      <span
        style={{
          backgroundColor: "#2ECC71",
          borderRadius: "3px",
          color: "white",
          padding: "2px",
          margin: "2px",
        }}
      >
        {props.technologies[i]}
      </span>
    );
  }

  return <div>{technologySpans}</div>;
}
