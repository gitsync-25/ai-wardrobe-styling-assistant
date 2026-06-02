export async function getStyleAdvice(outfit) {

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "user",
            content: `
Top: ${outfit.top}
Bottom: ${outfit.bottom}
Shoes: ${outfit.shoes}

Give short fashion advice.
`
          }
        ]
      })
    }
  );

  

  const data = await response.json();

console.log(
  "OPENROUTER RESPONSE:",
  data
);

if (!response.ok) {
  throw new Error(
    JSON.stringify(data)
  );
}

  

  return data.choices[0].message.content;
}