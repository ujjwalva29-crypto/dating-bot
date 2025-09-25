// Load env vars when running with Node (optional in browser)
try { require('dotenv').config(); } catch (_) {}

const url = "https://api.asi1.ai/v1/chat/completions";

// Prefer standard env variable names; do NOT hardcode secrets in source code
const apiKey =
  process.env.ASI_ONE_API_KEY ||
  process.env.REACT_APP_ASI_ONE_API_KEY ||
  "";

if (!apiKey) {
  console.error(
    "ASI_ONE_API_KEY is not set. Please set ASI_ONE_API_KEY (or REACT_APP_ASI_ONE_API_KEY)."
  );
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};

const data = {
  model: "asi1-mini",
  messages: [{ role: "user", content: "What is agentic AI?" }],
};

fetch(url, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((result) => {
    // Matches the structure shown in response.json
    console.log(result.choices?.[0]?.message?.content);
  })
  .catch((error) => {
    console.error("Error:", error);
  });