import Day from "./Day";
export default function Weather({ location, weather }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    weathercode: codes,
    time: dates,
  } = weather;

  return (
    <div>
      <h2>Weather in {location}</h2>
      <ul className="weather">
        {dates.map((n, i) => (
          <Day
            max={Number(max[i])}
            min={Number(min[i])}
            code={codes[i]}
            date={n}
            isToday={i === 0}
            key={n}
          />
        ))}
      </ul>
    </div>
  );
}
