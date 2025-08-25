import { FiFrown } from "react-icons/fi";

export function EmptyState({ text = "No se encontraron estancias." }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 text-center text-gray-500">
      <FiFrown className="w-12 h-12 mb-2 text-gray-400" />
      <p>{text}</p>
    </div>
  );
}
