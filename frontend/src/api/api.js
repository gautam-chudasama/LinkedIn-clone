// const API_URL = "http://localhost:5000/api"; // Replace with deployed URL
// const API_URL = "https://linkedin-clone-chi-eosin.vercel.app";
const API_URL = "https://linkedin-backend-ui34.onrender.com/api";

export const api = async (
  endpoint,
  method = "GET",
  body = null,
  token = null,
  isFormData = false
) => {
  const headers = isFormData ? {} : { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : null,
  });

  if (!res.ok) throw new Error("API request failed");
  return res.json();
};
