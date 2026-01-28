import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bot, User, Send } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "bot",
    content: "Hello!",
    timestamp: new Date().toLocaleTimeString(),
   
  },
]

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const {user}=useAuth();
  console.log(user,'ok')
  const domain = user?.email.split("@")[1]   
  const company = domain?.split(".")[0]  
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages, isTyping])

  const sendMessageToAPI = async (userQuery: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/agents/retrieval`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          user_query: userQuery,
          company_name: company || "Meta", 
          rag_type: "unstructured",
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to fetch bot response")
      }

      const data = await res.text()
      console.log(data,'response');

      return {
        content: data || "Sorry, I couldn't find an answer.",
      }
    } catch (error) {
      console.error(error)
      return {
        content: "Something went wrong. Please try again later.",
      }
    }
  }
  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    const response = await sendMessageToAPI(text)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response.content,
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
  }

 
  return (
    <main className="min-h-screen p-2 pt-20 bg-slate-50">
      <div className="mx-auto flex max-w-7xl gap-4">
        <Card className="flex flex-1 flex-col rounded-2xl border bg-background shadow-sm">
          
          <CardContent className="flex-1 overflow-y-auto space-y-5 p-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.type === "bot" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${
                    msg.type === "user"
                      ? "bg-slate-900 text-white rounded-tr-sm"
                      : "bg-muted border rounded-tl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <span className="mt-1 block text-xs opacity-60">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.type === "user" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300">
                    <User className="h-4 w-4 text-slate-700" />
                  </div>
                )}

             
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="flex gap-1 rounded-2xl border bg-muted px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 delay-150" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 delay-300" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          <div className="border-t bg-background p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-slate-900 hover:bg-slate-800"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </main>
  )
}
