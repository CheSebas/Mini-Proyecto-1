import axios from "axios";

// instancia básica de axios
const api = axios.create({
  baseURL: "/",
});

// función para obtener los stays
export const fetchStays = async () => {
  try {
    const response = await api.get("stays.json");
    return response.data;
  } catch (error) {
    console.error("Error al cargar los stays:", error);
    return [];
  }
};
