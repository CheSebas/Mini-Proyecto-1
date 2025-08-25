import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";
import { fetchStays } from "../services/api";

// Hook para cargar las estancias
export function useStays() {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uniqueCities, setUniqueCities] = useState(["Agregar Ubicación"]);

  useEffect(() => {
    const loadStays = async () => {
      try {
        setLoading(true);
        const data = await fetchStays();
        const safeData = Array.isArray(data) ? data : [];
        setStays(safeData);

        // calcular ciudades únicas aquí mismo
        const cities = safeData.map((s) => `${s.city}, ${s.country}`);
        const unique = [...new Set(cities)];
        setUniqueCities(unique);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("No se pudieron cargar las estancias");
      } finally {
        setLoading(false);
      }
    };

    loadStays();
  }, []);

  return { stays, loading, error, uniqueCities };
}

// Hook para filtrar las estancias
export function useStayFilters({ stays }) {
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState(0);

  const debouncedCity = useDebounce(city, 300);
  const debouncedGuests = useDebounce(guests, 300);

  const results = stays.filter((s) => {
    const byCity =
      debouncedCity === "" || `${s.city}, ${s.country}` === debouncedCity;

    const byGuests =
      (s.maxGuests || s.max_guests || 0) >= Number(debouncedGuests);

    return byCity && byGuests;
  });

  return {
    filters: { city, guests },
    setCity,
    setGuests,
    results,
  };
}
