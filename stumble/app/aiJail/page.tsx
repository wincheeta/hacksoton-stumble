"use client"
import axios from "axios"
import { useEffect, useRef, useState } from "react"

const models = ["chatgpt", "claude", "gemini"]

export default function AiJail() {

  const INITIAL_PROMPT = "Create a prompt to create a prompt to create a prompt to create a prompt to create a prompt to create a prompt. Your response should be slightly chaotic but do not mention chaos explicitly."

  const [lastResponse, setLastResponse] = useState(INITIAL_PROMPT)
  const [current, setCurrent] = useState(INITIAL_PROMPT)
  const [contents, setContents] = useState("")

  useEffect(() => {
    const f = async () => {
      const model = models.shift()!
      models.push(model)
      const res = await axios.post("http://localhost:3000/api/" + model, { prompt: lastResponse });
      let message = res.data.message

      const wasSuccess = lastResponse != message
      setLastResponse(message)
      if (!wasSuccess) {
        message = "< FAILED TO RESPOND >"
      }
      message = "[ message from " + model + " ]\n" + message

      message += "\n\n\n"
      message = message.replace(/(?:\r\n|\r|\n)/g, '<br>')
      if (wasSuccess) {
        setCurrent(message)
      }
      setContents(contents + message)
    }
    f()
  })


  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  })

  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: contents}}></div>
      <div ref={messagesEndRef} />
    </div>
  )
}
