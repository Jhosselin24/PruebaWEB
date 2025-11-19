import React, { useState } from "react";

export default function Login({ backend, onLogin }) {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    setMsg("Ingresando...");

    const res = await fetch(`${backend}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) return setMsg(data.message);

    onLogin(data.token, data.user);
  }

  return (
    <div className="card">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) => setU(e.target.value)}
        />

        <input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setP(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>

      <p className="msg">{msg}</p>
      <p>Demo: admin/admin123</p>
    </div>
  );
}
