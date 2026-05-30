export async function testOpenRouter() {
  try {
    console.log(
      "API KEY:",
      import.meta.env.VITE_OPENROUTER_API_KEY
    );

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  model: "openai/gpt-oss-20b:free",
  messages: [
    {
      role: "user",
      content: "Say hello"
    }
  ]
})
      }
    );

    console.log("STATUS:", response.status);

    const data = await response.json();

    console.log(
  "OPENROUTER RESPONSE:",
  JSON.stringify(data, null, 2)
);

  } catch (error) {
    console.error("ERROR:", error);
  }
}