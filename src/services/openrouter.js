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
You are a professional fashion stylist.

Analyze this outfit:

Top:
${outfit.top}

Bottom:
${outfit.bottom}

Shoes:
${outfit.shoes}

Occasion:
${outfit.occasion}

Match Score:
${outfit.score}/10

Give:
- Style category
- Why it works
- Best occasion
- One improvement

Keep it under 80 words.
`
          }
        ]
      })
    }
  );

  const data = await response.json();

  return data.choices[0].message.content;
}