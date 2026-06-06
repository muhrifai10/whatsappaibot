const express = require("express");
const cors    = require("cors");
const path    = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL     = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent";

const SYSTEM = "Kamu adalah asisten AI yang ramah dan membantu. Balas dalam bahasa Indonesia yang santai dan friendly seperti chat WhatsApp. Pakai emoji sesekali. Jawab singkat dan padat kecuali memang perlu penjelasan panjang.";

// ── POST /api/chat ──────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Field 'messages' harus berupa array." });
  }

  // Konversi format history ke format Gemini
  const contents = messages.map(m => ({
    role : m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  try {
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method : "POST",
      headers: { "Content-Type": "application/json" },
      body   : JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM }] },
        contents,
        generationConfig: { maxOutputTokens: 1024 }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const msg = data.error?.message || "Gemini API error";
      return res.status(500).json({ error: msg });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "(tidak ada respons)";
    res.json({ reply });

  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("*", (_, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅  Server jalan di http://localhost:${PORT}`));
