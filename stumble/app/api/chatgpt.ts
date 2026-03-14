import axios from "axios"

const API_KEY = "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"
const API_URL = "https://api.openai.com/v1/chat/completions"

export async function chatgpt(prompt: string): Promise<string> {
  try {
    const res = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return res.data.choices[0].message.content
  } catch (error) {
    console.error("Could not call ChatGPT: " + error)
    return prompt
  }
}
