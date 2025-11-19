import React, { useEffect, useState } from "react";

export default function Favorites({ backend, token }) {
  const [favorites, setFavorites] = useState([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch(`${backend}/favorites`, {
      headers: { Authorization: "Bearer " + token }
    });

    const data = await res.json();
    if (!res.ok) return setMsg("Error cargando");

    setFavorites(data);
  }

  useEffect(() => {
    load();
  }, []);

  function cover(f) {
    const b = f.book;
    if (b.cover_i)
      return `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`;
    return "https://via.placeholder.com/100x150?text=No+Cover";
  }

  async function removeFav(id) {
    await fetch(`${backend}/favorites/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    });

    setFavorites(favorites.filter((x) => x.id !== id));
  }

  return (
    <div className="card">
      <h2>Favoritos</h2>

      {favorites.map((f) => (
        <div key={f.id} className="fav-item">
          <img src={cover(f)} />

          <div style={{ flex: 1 }}>
            <div className="book-title">{f.name}</div>
            <div className="book-author">
              {f.book?.author_name?.join(", ")}
            </div>
          </div>

          <div>
            <button onClick={() => removeFav(f.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
