import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { translateText } from "./deeplTranslate.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());

// ================= FAVORITOS =================
let favorites = [];

app.post("/favorites", (req, res) => {
  const { name, book } = req.body;

  if (!name || !book) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  favorites.push(req.body);
  res.json({ msg: "Guardado correctamente" });
});

app.get("/favorites", (req, res) => {
  res.json(favorites);
});

// ================= TRADUCCIÓN =================
app.post("/translate", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Texto vacío" });
  }

  try {
    const translated = await translateText(text);
    res.json({ translated });
  } catch (err) {
    console.log("ERROR DEEPL:", err);
    res.status(500).json({ error: "Error traduciendo" });
  }
});

app.listen(4000, () => {
  console.log("Backend corriendo en http://localhost:4000");
});
