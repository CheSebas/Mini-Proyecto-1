import { IoIosClose, IoIosRemove, IoIosAdd, IoIosSearch } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function SearchPopup({
  isOpen,
  onClose,
  value,
  onChange,
  onSearch,
  cities = [],
}) {
  const { city, guests } = value;
  const [localGuests, setLocalGuests] = useState({
    adults: guests || 0,
    children: 0,
  });
  const [localLocation, setLocalLocation] = useState(city || "");
  const [visible, setVisible] = useState(false);

  // 👇 nuevo: controla qué sección mostrar ("location", "guests" o null)
  const [activeSection, setActiveSection] = useState(null);

  // Animación
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      setActiveSection(null); // resetea al cerrar
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const changeGuests = (type, add) => {
    setLocalGuests((prev) => {
      const updated = { ...prev };
      if (!add && updated[type] === 0) return prev;
      updated[type] = add ? updated[type] + 1 : updated[type] - 1;
      return updated;
    });
  };

  const confirmSearch = () => {
    onChange({
      city: localLocation,
      guests: localGuests.adults + localGuests.children,
    });
    onSearch();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" onClick={onClose} />

      {/* Panel */}
      <div
        className={`relative bg-white w-full h-1/2 shadow-lg rounded-b-xl transform transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Botón cerrar */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <IoIosClose size={28} />
        </button>

        {/* Header con inputs */}
        <div className="grid grid-cols-3 gap-2 shadow-md rounded-xl overflow-hidden m-6 mb-6">
          {/* Ubicación */}
          <div
            className={`relative border-r border-gray-300 p-3 cursor-pointer ${
              activeSection === "location" ? "bg-gray-100" : ""
            }`}
            onClick={() => setActiveSection("location")}
          >
            <label className="text-[10px] uppercase font-bold text-gray-800 block mb-1">
              Ubicación
            </label>
            <input
              type="text"
              value={localLocation}
              placeholder="Agregar ubicación"
              onChange={(e) => setLocalLocation(e.target.value)}
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
          </div>

          {/* Huéspedes */}
          <div
            className={`relative border-r border-gray-300 p-3 cursor-pointer ${
              activeSection === "guests" ? "bg-gray-100" : ""
            }`}
            onClick={() => setActiveSection("guests")}
          >
            <label className="text-[10px] uppercase font-bold text-gray-800 block mb-1">
              Huéspedes
            </label>
            <p className="text-sm text-gray-400">
              {localGuests.adults + localGuests.children > 0
                ? `${localGuests.adults + localGuests.children} huésped(es)`
                : "Añadir huésped"}
            </p>
          </div>

          {/* Botón buscar */}
          <div className="flex items-center justify-center p-3">
            <button
              onClick={confirmSearch}
              className="flex items-center gap-2 bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              <IoIosSearch /> Buscar
            </button>
          </div>
        </div>

        {/* Contenido dinámico */}
        <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden m-6 mb-6">
          {/* Columna de Location */}
          <div>
            {activeSection === "location" && localLocation.trim() !== "" && (
              <div>
                <h3 className="font-bold mb-3">Seleccionar ubicación</h3>
                {cities
                  .filter((loc) =>
                    loc.toLowerCase().includes(localLocation.toLowerCase())
                  )
                  .map((loc) => (
                    <div
                      key={loc}
                      className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md ${
                        localLocation === loc
                          ? "bg-gray-100 font-semibold"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setLocalLocation(loc)}
                    >
                      <FaMapMarkerAlt className="text-gray-500 text-xl" />
                      <span>{loc}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Columna de Guests */}
          <div>
            {activeSection === "guests" && (
              <div>
                <h3 className="font-bold mb-3">Seleccionar Huéspedes</h3>

                {/* Adultos */}
                <div className="mb-6">
                  <p className="font-semibold">Adultos</p>
                  <p className="text-sm text-gray-400">Mayores a 13 años</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => changeGuests("adults", false)}
                      className="border p-1 rounded"
                    >
                      <IoIosRemove />
                    </button>
                    <span>{localGuests.adults}</span>
                    <button
                      onClick={() => changeGuests("adults", true)}
                      className="border p-1 rounded"
                    >
                      <IoIosAdd />
                    </button>
                  </div>
                </div>

                {/* Niños */}
                <div>
                  <p className="font-semibold">Niños</p>
                  <p className="text-sm text-gray-400">Menores a 13 años</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => changeGuests("children", false)}
                      className="border p-1 rounded"
                    >
                      <IoIosRemove />
                    </button>
                    <span>{localGuests.children}</span>
                    <button
                      onClick={() => changeGuests("children", true)}
                      className="border p-1 rounded"
                    >
                      <IoIosAdd />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
