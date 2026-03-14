import { chatgpt } from "./chatgpt"
import { gemini } from "./gemini"
import { claude } from "./claude"


//export async function GET(request: Request): Promise<Response> {
//  return "bruh"
//}
//

let current = "Re-enact Hamlet. Choose a role and play that role going forwards."

while (true) {
  current = await gemini(current)
  console.log(current)
  current = await claude(current)
  console.log(current)
  current = await chatgpt(current)
  console.log(current)
}
