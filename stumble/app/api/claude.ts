import axios from "axios"

const API_KEY = "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"
const API_URL = "https://api.anthropic.com/v1/messages"

export async function claude(prompt: string): Promise<string> {
  try {
    const res = await axios.post(
      API_URL,
      {
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{role: "user", content: prompt }]
      },
      {
        headers: {
          'x-api-key': `${API_KEY}`,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
      }
    )
    return res.data.content[0].text
  } catch (error) {
    console.error("Could not call Claude: " + error)
    return prompt
  }
}
