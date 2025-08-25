import { IoIosStar } from "react-icons/io";

export default function StayCard({ stay }) {
  const { photo, title, type, beds, rating, superHost, city, country } = stay;

  return (
    <article className="rounded-lg overflow-hidden">
      {/* Imagen */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          src={photo}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Info */}
      <div className="p-3 text-sm">
        {/* Super Host */}
        {superHost && (
          <span className="inline-block mb-2 px-2 py-1 text-xs bg-gray-200 rounded">
            Super Host
          </span>
        )}

        <p className="text-gray-600">
          {type} {beds ? `· ${beds} camas` : ""}
        </p>

        <p className="text-gray-800 font-semibold">{title}</p>
        <p className="text-gray-500 text-xs">
          {city}, {country}
        </p>

        <p className="mt-1 text-yellow-600 font-bold flex items-center gap-1">
          <IoIosStar />
          {rating}
        </p>
      </div>
    </article>
  );
}
