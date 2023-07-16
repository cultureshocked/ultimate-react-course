import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";

export default function CountryList() {
  const { cities, isLoading } = useCities();
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
  console.log(countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
