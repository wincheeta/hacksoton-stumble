import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const API_KEY = "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"
const API_URL = "https://api.openai.com/v1/chat/completions"

export default async function chatgpt(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  try {
    const apiRes = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.prompt }],
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )
    res.status(200).json({ message: apiRes.data.choices[0].message.content })
  } catch (error) {
    console.error("Could not call ChatGPT: " + error)
    res.status(200).json({ message: req.body.prompt })
  }
}
