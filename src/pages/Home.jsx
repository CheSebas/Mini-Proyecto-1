import { useStays, useStayFilters } from "../hooks/useStays";
import SearchBar from "../components/SearchBar";
import StayCard from "../components/StayCard";
import { EmptyState } from "../components/EmptyState";

export default function Home() {
  const { stays, loading, error, uniqueCities } = useStays();
  const { filters, setCity, setGuests, results } = useStayFilters({ stays });

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <header className="py-6 flex flex-row justify-between items-center gap-4">
        <img
          src="https://raw.githubusercontent.com/FunvalProgra/windbnb-base/97e46b36269cd8e5b8e274778e56440ebfdec717/src/img/logo.svg"
          alt="Windbnb Logo"
          className="h-8 cursor-pointer"
          onClick={() => window.location.reload()}
        />
        <SearchBar
          cities={uniqueCities}
          value={filters}
          onChange={({ city, guests }) => {
            if (city !== undefined) setCity(city);
            if (guests !== undefined) setGuests(guests);
          }}
          locations={uniqueCities}
        />
      </header>
      {/* Meta */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Estancias en Finlandia</h1>
        <span className="text-sm text-gray-500">
          {results.length} resultados
        </span>
      </div>

      {/* Contenido */}
      {loading && <p className="text-center py-10">Cargando estancias...</p>}

      {error && <EmptyState text={`Ocurrió un error: ${error}`} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.length === 0 ? (
            <EmptyState />
          ) : (
            results.map((stay, i) => <StayCard key={i} stay={stay} />)
          )}
        </div>
      )}
    </div>
  );
}
