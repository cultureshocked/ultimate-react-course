import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (cities.length == 0)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = [
    ...new Set(
      cities.map((city) => {
        return { emoji: city.emoji, country: city.country };
      })
    ),
  ];
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
