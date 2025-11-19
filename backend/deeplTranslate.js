import fetch from "node-fetch";

const DEEPL_KEY = "206268c0-ec95-46d4-aaa2-9b4fd0857334:fx";

export async function translateText(text, target = "ES") {
  const url = "https://api-free.deepl.com/v2/translate";

  const params = new URLSearchParams();
  params.append("auth_key", DEEPL_KEY);
  params.append("text", text);
  params.append("target_lang", target);

  const res = await fetch(url, {
    method: "POST",
    body: params
  });

  const data = await res.json();

  if (data.translations) {
    return data.translations[0].text;
  }

  console.log("DeepL error:", data);
  throw new Error("DeepL no devolvió una traducción");
}
