import {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

const CityContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "toggleLoad":
      return { ...state, isLoading: !state.isLoading };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
      };
    case "cities/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    case "cities/deleted":
      return {
        ...state,
        cities: state.cities.filter((n) => n.id != action.payload),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      console.log("No clue mate");
  }
}

function CityProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    const fetchCities = async () => {
      try {
        dispatch({ type: "toggleLoad" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        alert("There was an error loading the data");
      } finally {
        dispatch({ type: "toggleLoad" });
      }
    };
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      try {
        dispatch({ type: "toggleLoad" });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err });
      } finally {
        dispatch({ type: "toggleLoad" });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "toggleLoad" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "cities/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    } finally {
      dispatch({ type: "toggleLoad" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "toggleLoad" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "cities/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    } finally {
      dispatch({ type: "toggleLoad" });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("Context used outside of context provider scope.");
  return context;
}

export { useCities, CityProvider };
