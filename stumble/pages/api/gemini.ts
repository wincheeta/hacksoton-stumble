import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const API_KEY = "AIzaSyByNfpwOQao1-XBgO8pqMx836m2Ll0IPUE"
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent"

export default async function gemini(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  try {
    const apiRes = await axios.post(
      API_URL,
      {
        contents: [{ parts: [{text: req.body.prompt}] }],
      },
      {
        headers: {
          'x-goog-api-key': `${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )
    res.status(200).json({ message: apiRes.data.candidates[0].content.parts[0].text })
  } catch (error) {
    console.error("Could not call Gemini: " + error)
    res.status(200).json({ message: req.body.prompt })
  }
}
