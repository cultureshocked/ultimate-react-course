import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
export default function CityList() {
  const { cities, isLoading } = useCities();
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();

  if (!isAuthenticated) nav("/login");

  if (isLoading) return <Spinner />;
  if (cities.length == 0)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
