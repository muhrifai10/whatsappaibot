# 🤖 WhatsApp AI Chatbot — Claude

Website chatbot bergaya WhatsApp yang ditenagai Claude AI dari Anthropic.

---

## 📁 Struktur Proyek

```
whatsapp-ai-bot/
├── server.js          ← Backend (Express + Anthropic SDK)
├── package.json
├── .env               ← Buat sendiri (lihat langkah 2)
└── public/
    └── index.html     ← Frontend (WhatsApp UI)
```

---

## 🚀 Cara Deploy Gratis di Railway

### Langkah 1 — Buat akun & upload ke GitHub
1. Buat repo GitHub baru (misalnya `whatsapp-ai-bot`)
2. Upload semua file ini ke repo tersebut
3. Daftar/login di [railway.app](https://railway.app) → **"New Project"**
4. Pilih **"Deploy from GitHub repo"** → pilih repo kamu

### Langkah 2 — Tambahkan API Key
Di dashboard Railway:
1. Klik project kamu → tab **"Variables"**
2. Klik **"New Variable"**
3. Isi:
   - **Name** : `ANTHROPIC_API_KEY`
   - **Value** : API key kamu dari [console.anthropic.com](https://console.anthropic.com)
4. Klik **"Add"**

> Belum punya API key? Daftar di https://console.anthropic.com → gratis, ada free credits.

### Langkah 3 — Deploy!
Railway otomatis build & deploy. Setelah selesai kamu dapat URL seperti:
```
https://whatsapp-ai-bot-production.up.railway.app
```

---

## 💻 Jalankan Lokal (Opsional)

```bash
# 1. Install dependencies
npm install

# 2. Buat file .env
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env

# 3. Jalankan server
npm start
# → Buka http://localhost:3000
```

---

## ⚙️ Kustomisasi

Edit bagian `system` di `server.js` untuk mengubah kepribadian AI:

```js
system: "Kamu adalah asisten AI bernama ...",
```

---

## 🛠️ Tech Stack

| Komponen  | Teknologi               |
|-----------|-------------------------|
| Backend   | Node.js + Express       |
| AI        | Anthropic Claude Sonnet |
| Frontend  | HTML + CSS + Vanilla JS |
| Deploy    | Railway (gratis)        |
