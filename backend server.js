import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const API_KEY = "YOUR_CHOSEN_TTS_API_KEY"; // replace
const API_URL = "https://api.elevenlabs.io/v1/text-to-speech"; // example

app.post("/tts", async (req, res) => {
  const { text, voice } = req.body;

  try {
    const response = await fetch(`${API_URL}/${voice}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
        "xi-api-key": API_KEY
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_v3" // high quality
      })
    });

    const arrayBuffer = await response.arrayBuffer();
    res.set("Content-Type", "audio/mpeg");
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "TTS failed" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
