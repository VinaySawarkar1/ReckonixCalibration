import React, { useState, useRef, useEffect } from "react";

// Utility to generate a random session ID
function getSessionId() {
  let id = localStorage.getItem("reckonix_chatbot_session");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("reckonix_chatbot_session", id);
  }
  return id;
}

const initialMessages = [
  { sender: "bot", text: "Hi! I'm Reckonix Assistant. How can I help you today? (Ask about products, support, or submit a complaint)" }
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sessionId = getSessionId();

  useEffect(() => {
    if (open) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setTyping(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, sessionId })
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();
      setMessages((msgs) => [...msgs, { sender: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: "bot", text: "Sorry, there was a problem connecting to the server. Please try again later." }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-80 bg-white shadow-2xl rounded-xl flex flex-col border border-gray-200">
          <div className="flex items-center justify-between px-4 py-2 bg-primary text-white rounded-t-xl">
            <span className="font-bold">Chat with us</span>
            <button onClick={() => setOpen(false)} className="text-white text-xl">×</button>
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-y-auto h-80 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${msg.sender === "user" ? "bg-primary text-white" : "bg-gray-200 text-gray-900"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-lg bg-gray-200 text-gray-900 text-sm animate-pulse">Assistant is typing…</div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="flex items-center p-2 border-t bg-white">
            <input
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            <button
              className="ml-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
              onClick={handleSend}
              disabled={!input.trim()}
            >Send</button>
          </div>
        </div>
      ) : (
        <button
          className="bg-primary text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl hover:bg-primary/90 transition"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
        >💬</button>
      )}
    </div>
  );
} 