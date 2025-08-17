"use client";
import { useRef, useState, useEffect } from "react";
import { Bot, Send, Loader2 } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
import { api } from "../../../../utils/Axios";
import BottomNav from "../../../../components/bottomBar";
import NavBar from "../../../../components/heading";

const AiPromptPanel = () => {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [showTypewriter, setShowTypewriter] = useState(false);
  const responseEndRef = useRef(null);

  // Auto-scroll to bottom as the AI types
  useEffect(() => {
    if (showTypewriter && responseEndRef.current) {
      responseEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiResponse, showTypewriter]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsProcessing(true);
    setAiResponse("");
    setError("");
    setShowTypewriter(false);

    try {
      const res = await api.post("/ai/prompt", { prompt });
      const data = res.data;
      setAiResponse(
        data?.data?.response ||
          data?.data?.diagnosis ||
          data?.message ||
          "No response available."
      );
      setShowTypewriter(true);
    } catch (err) {
      setAiResponse("");
      setError(
        err?.response?.data?.message ||
          "Sorry, there was a problem contacting the AI server."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="theme flex flex-col items-center justify-center min-h-[90vh]  px-2 py-8">
        <div className="w-full max-w-2xl  rounded-3xl shadow-2xl  p-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-8 pt-8 pb-4">
            <Bot className="w-8 h-8 text-green-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              AI Plant Disease Chat
            </h2>
          </div>
          {/* Chat Area */}
          <div className="flex flex-col px-4 md:px-8 pb-4 min-h-[350px] max-h-[55vh] overflow-y-auto custom-scrollbar">
            {/* User Prompt Bubble */}
            {prompt && !isProcessing && aiResponse && (
              <div className="flex gap-3 items-start mb-4">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-green-400 to-green-700 p-2 rounded-full shadow-lg border-2 border-green-300">
                    <span className="font-bold text-white">U</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-[#23272f] text-[#e6e6e6] rounded-2xl px-5 py-3 shadow border border-[#2a2d34] font-sans text-base leading-relaxed whitespace-pre-line">
                    {prompt}
                  </div>
                </div>
              </div>
            )}
            {/* AI Response Bubble */}
            {isProcessing ? (
              <div className="flex gap-3 items-start mt-4">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-green-500 to-green-700 p-2 rounded-full shadow-lg border-2 border-green-300">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-[#23272f] text-blue-200 rounded-2xl px-6 py-5 shadow border border-[#2a2d34] font-mono text-[1.07rem] leading-relaxed flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI is thinking...
                  </div>
                </div>
              </div>
            ) : aiResponse ? (
              <div className="flex gap-3 items-start mt-4">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-green-500 to-green-700 p-2 rounded-full shadow-lg border-2 border-green-300">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-[#23272f] text-[#e6e6e6] rounded-2xl px-6 py-5 shadow border border-[#2a2d34] font-mono text-[1.07rem] leading-relaxed whitespace-pre-line relative">
                    {showTypewriter ? (
                      <Typewriter
                        words={[aiResponse]}
                        typeSpeed={18}
                        cursor
                        cursorStyle="|"
                        onType={() => {
                          if (responseEndRef.current) {
                            responseEndRef.current.scrollIntoView({
                              behavior: "smooth",
                            });
                          }
                        }}
                      />
                    ) : (
                      ""
                    )}
                    <span className="absolute top-2 right-4 text-xs text-gray-500 font-sans">
                      AI
                    </span>
                    <div ref={responseEndRef} />
                  </div>
                </div>
              </div>
            ) : null}
            {/* Error */}
            {error && (
              <div className="text-red-400 text-sm mt-4 px-2">{error}</div>
            )}
          </div>
          {/* Prompt Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 px-4 md:px-8 py-6 border-t border-[#2a2d34] bg-[#23272f]"
          >
            <input
              type="text"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Ask about plant diseases, symptoms, or treatments..."
              className="flex-1 bg-[#23272f] border border-[#2a2d34] rounded-xl px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 font-sans text-base"
              disabled={isProcessing}
              autoFocus
              maxLength={400}
            />
            <button
              type="submit"
              disabled={isProcessing || !prompt.trim()}
              className="flex items-center justify-center bg-gradient-to-br from-green-600 to-green-800 text-white rounded-xl px-5 py-3 font-semibold shadow-lg hover:opacity-90 transition text-base disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
        {/* Custom scrollbar styling */}
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #2a2d34;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
        `}</style>
      </div>
      <BottomNav />
    </>
  );
};

export default AiPromptPanel;
