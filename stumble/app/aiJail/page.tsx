"use client"
import axios from "axios"
import { useEffect, useState } from "react"

const models = ["chatgpt", "claude", "gemini"]

export default function AiJail() {

  const INITIAL_PROMPT = "Create a prompt to create a prompt to create a prompt to create a prompt to create a prompt to create a prompt."

  const [lastResponse, setLastResponse] = useState(INITIAL_PROMPT)
  const [current, setCurrent] = useState(INITIAL_PROMPT)
  const [contents, setContents] = useState(INITIAL_PROMPT)

  useEffect(() => {
    const f = async () => {
      const i = Math.floor(Math.random() * models.length)
      const model = models[i]
      const res = await axios.post("http://localhost:3000/api/" + model, { prompt: current });
      let message = res.data.message

      const wasSuccess = lastResponse != message
      setLastResponse(message)
      if (!wasSuccess) {
        message = "< FAILED TO RESPOND >"
      }
      message = "====================\n[[[[ " + model + " ]]]]\n====================\n" + message

      message += "\n\n\n"
      message = message.replace(/(?:\r\n|\r|\n)/g, '<br>')
      if (wasSuccess) {
        setCurrent(message)
      }
      setContents(contents + message)
    }
    f()
  })

  return (
    <div dangerouslySetInnerHTML={{__html: contents}}>
    </div>
  )
}
