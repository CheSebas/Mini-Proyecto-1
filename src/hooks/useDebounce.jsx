import { useState, useEffect } from "react";

export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // esperar un tiempo antes de actualizar el valor
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // limpiar el timer si cambia el valor o se desmonta
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
