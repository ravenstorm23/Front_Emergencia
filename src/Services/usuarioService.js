const API_URL = "http://localhost:4000/api"; // Cambia a tu URL real

export async function getUsuarioByEmail(email) {
  const res = await fetch(`${API_URL}/usuarios?email=${email}`);
  if (!res.ok) throw new Error("Error al obtener usuario");
  const data = await res.json();
  return data; // devuelve objeto usuario
}
