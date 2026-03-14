import axios from "axios"

const API_KEY = "AIzaSyByNfpwOQao1-XBgO8pqMx836m2Ll0IPUE"
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent"

export async function gemini(prompt: string): Promise<string> {
  try {
    const res = await axios.post(
      API_URL,
      {
        contents: [{ parts: [{text: prompt}] }],
      },
      {
        headers: {
          'x-goog-api-key': `${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return res.data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error("Could not call Gemini: " + error)
    return prompt
  }
}
