const express = require("express");
const cors    = require("cors");
const Anthropic = require("@anthropic-ai/sdk");
const path    = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Sajikan file frontend dari folder /public
app.use(express.static(path.join(__dirname, "public")));

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── POST /api/chat ──────────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Field 'messages' harus berupa array." });
  }

  try {
    const response = await client.messages.create({
      model     : "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system    : "Kamu adalah asisten AI yang ramah bernama Claude. Balas dalam bahasa Indonesia yang santai dan friendly seperti chat WhatsApp. Pakai emoji sesekali. Jawab singkat dan padat kecuali memang perlu penjelasan panjang.",
      messages  : messages,
    });

    const text = response.content
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n");

    res.json({ reply: text });
  } catch (err) {
    console.error("Anthropic error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Fallback: semua route lain → index.html (SPA)
app.get("*", (_, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅  Server jalan di http://localhost:${PORT}`));
