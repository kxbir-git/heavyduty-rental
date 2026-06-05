import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  "What excavators do you have?",
  "How much to rent a crane for a week?",
  "Do you provide operators?",
  "What cities do you serve?",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm KK & Sons Equip's AI assistant. Ask me about our fleet, pricing, availability, or request a quote.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = "";

      if (lower.includes("excavator") || lower.includes("digger")) {
        response = "We have CAT 320 GC (₹18,500/day) and Komatsu PC210 LC (₹16,500/day) available. Both come with optional certified operators. Would you like to request a quote?";
      } else if (lower.includes("crane")) {
        response = "Our crane fleet includes Liebherr LTM 1090 (₹45,000/day) and XCMG QY25K (₹28,000/day). Weekly rates offer significant savings. Browse our fleet for full specs.";
      } else if (lower.includes("price") || lower.includes("cost") || lower.includes("rent") || lower.includes("week")) {
        response = "Pricing varies by equipment type and duration. Daily rates start from ₹3,200 (forklifts) to ₹45,000 (heavy cranes). Weekly and monthly discounts apply. Use our quote builder for an instant estimate!";
      } else if (lower.includes("operator") || lower.includes("driver")) {
        response = "Yes! We provide certified operators at ₹2,500/day per machine. All our 200+ operators are OEM-trained with an average of 8 years experience.";
      } else if (lower.includes("city") || lower.includes("serve") || lower.includes("location") || lower.includes("area")) {
        response = "We serve pan-India with depots in Mumbai, Pune, Nashik, Nagpur, Surat, Ahmedabad, Indore, Hyderabad, Bangalore, Chennai, Delhi NCR, and Jaipur. 24-hour delivery to most locations.";
      } else if (lower.includes("quote") || lower.includes("book")) {
        response = "You can build a custom quote on our /quote page! Select your equipment, rental duration, and add operators if needed. We'll confirm within 2 hours.";
      } else if (lower.includes("hello") || lower.includes("hi")) {
        response = "Hello! How can I help you with your equipment rental needs today?";
      } else {
        response = "I can help with fleet info, pricing, availability, and quotes. Try asking about specific equipment like excavators or cranes, or visit our Equipment Fleet page to browse the full catalog.";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen
            ? "bg-white/10 border border-white/20 rotate-90"
            : "bg-[#FFB800] hover:scale-110"
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-black" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] glass-card rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3 bg-[#FFB800]/5">
            <div className="w-10 h-10 rounded-full bg-[#FFB800] flex items-center justify-center">
              <Bot className="h-5 w-5 text-black" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">KK & Sons AI</p>
              <p className="text-xs text-white/40 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Online now
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-[#FFB800]/10 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-[#FFB800]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#FFB800] text-black font-medium"
                      : "bg-white/5 text-white/80 border border-white/5"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFB800]/10 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-[#FFB800]" />
                </div>
                <div className="bg-white/5 border border-white/5 p-3 rounded-lg">
                  <Loader2 className="h-4 w-4 text-[#FFB800] animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 hover:bg-[#FFB800]/10 hover:text-[#FFB800] hover:border-[#FFB800]/20 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-white/5">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about our fleet..."
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFB800] text-sm"
              />
              <Button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-[#FFB800] text-black hover:bg-[#FFB800]/90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
