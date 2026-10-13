import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X, CalendarCheck } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SUGGESTIONS = [
  "Tell me about Shankarpally Villa Plots",
  "What property types can I explore?",
  "How do I book a site visit?",
];

function Bubble({ role, content, typing }) {
  const isUser = role === "user";
  return (
    <div data-testid={`chatbot-message-${role}`} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[13.5px] leading-6 ${
          isUser
            ? "rounded-br-md bg-navy text-white"
            : "rounded-bl-md border border-navy/10 bg-white text-charcoal"
        }`}
      >
        {content || (typing ? (
          <span className="flex gap-1 py-1" data-testid="chatbot-typing">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:300ms]" />
          </span>
        ) : null)}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef(null);
  const sessionRef = useRef(null);

  useEffect(() => {
    if (!sessionRef.current) {
      sessionRef.current =
        sessionStorage.getItem("sv-chat-session") ||
        (crypto.randomUUID ? crypto.randomUUID() : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`);
      sessionStorage.setItem("sv-chat-session", sessionRef.current);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  if (pathname.startsWith("/admin")) return null;

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || streaming) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: msg }, { role: "assistant", content: "" }]);
    setStreaming(true);
    try {
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionRef.current, message: msg }),
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const payload = JSON.parse(line.slice(6));
            if (payload.delta) {
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: copy[copy.length - 1].content + payload.delta };
                return copy;
              });
            } else if (payload.error) {
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: payload.error };
                return copy;
              });
            }
          } catch {
            /* ignore malformed keep-alive lines */
          }
        }
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Sorry — the assistant is unavailable right now. Please call +91 93475 30281 or WhatsApp us.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="chatbot-panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[60] flex h-[540px] max-h-[calc(100dvh-8rem)] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-navy/15 bg-ice shadow-lift sm:right-6"
          >
            <div className="navy-panel flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold text-midnight">
                  <Bot size={20} />
                </span>
                <div>
                  <p className="font-display text-[15px] font-bold text-white">SV Assistant</p>
                  <p className="text-[11px] text-white/60">Ask about our projects — 24×7</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                data-testid="chatbot-close-button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/25 text-white transition-colors hover:border-gold hover:text-gold"
              >
                <X size={17} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" data-testid="chatbot-messages">
              {messages.length === 0 && (
                <div className="pt-2">
                  <p className="text-[13px] leading-6 text-steel">
                    Hi! I'm the SV Developers assistant. Ask me about our
                    projects, locations or how to book a site visit.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        data-testid={`chatbot-suggestion-${SUGGESTIONS.indexOf(s)}`}
                        onClick={() => send(s)}
                        className="rounded-lg border border-navy/15 bg-white px-3.5 py-2.5 text-left text-[12.5px] font-medium text-navy transition-all duration-200 hover:border-gold hover:bg-gold-light/50"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} content={m.content} typing={streaming && i === messages.length - 1} />
              ))}
            </div>

            <div className="border-t border-navy/10 bg-white p-3">
              {messages.length > 0 && (
                <Link
                  to="/contact"
                  data-testid="chatbot-book-visit-link"
                  className="mb-2.5 inline-flex items-center gap-2 rounded-md bg-gold-light px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-gold"
                >
                  <CalendarCheck size={13} /> Book a site visit
                </Link>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-center gap-2"
              >
                <input
                  data-testid="chatbot-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, locations…"
                  className="field-input !py-2.5"
                  aria-label="Chat message"
                />
                <button
                  type="submit"
                  data-testid="chatbot-send-button"
                  disabled={streaming || !input.trim()}
                  aria-label="Send message"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-navy text-white transition-all duration-200 hover:bg-gold hover:text-midnight disabled:opacity-50"
                >
                  <Send size={17} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        data-testid="chatbot-launcher"
        aria-label="Open chat assistant"
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold text-midnight shadow-lift sm:right-6"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
        {!open && <span className="chat-pulse absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />}
      </motion.button>
    </>
  );
}
