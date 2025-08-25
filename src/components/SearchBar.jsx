import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import SearchPopup from "./SearchPopup";

export default function SearchBar({ cities, value, onChange }) {
  const { city, guests } = value;
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    console.log("Buscando:", { city, guests });
    // Aquí podrías disparar la búsqueda real
  };

  return (
    <>
      <div
        className="flex items-center bg-white rounded-xl shadow-md px-4 gap-2 h-14 max-w-full cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {/* Ciudad */}
        <span className="w-full text-sm text-gray-400 truncate">
          {city || "Selecciona ciudad"}
        </span>

        {/* Huéspedes */}
        <span className="w-full text-sm text-gray-400 truncate">
          {guests ? `${guests} huésped(es)` : "Añadir huésped"}
        </span>

        {/* Botón de búsqueda */}
        <button
          type="button"
          className="text-gray-600 hover:text-black text-lg focus:outline-none"
          title="Buscar"
        >
          <IoIosSearch className="text-red-400 text-xl" />
        </button>
      </div>

      {/* Popup */}
      <SearchPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        cities={cities}
        value={value}
        onChange={onChange}
        onSearch={handleSearch}
      />
    </>
  );
}

// // SearBar.jsx
// import { IoIosSearch } from "react-icons/io";

// export default function SearchBar({ cities, value, onChange }) {
//   const { city, guests } = value;

//   return (
//     <div className="flex items-center bg-white rounded-xl shadow-md px-4 gap-2 h-14 max-w-full">
//       {/* Ciudad */}
//       <select
//         value={city}
//         onChange={(e) => onChange({ city: e.target.value, guests })}
//         className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
//       >
//         {cities.map((opt) => (
//           <option key={opt} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>

//       {/* Huéspedes */}
//       <input
//         type="number"
//         min={1}
//         value={guests}
//         onChange={(e) =>
//           onChange({ city, guests: Math.max(1, Number(e.target.value)) })
//         }
//         placeholder="Huéspedes"
//         className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
//       />

//       {/* Botón de búsqueda */}
//       <button
//         type="button"
//         className="text-gray-600 hover:text-black text-lg focus:outline-none"
//         title="Buscar"
//       >
//         <IoIosSearch className="text-red-500 text-xl" />
//       </button>
//     </div>
//   );
// }
