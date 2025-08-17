"use client";
import { useRef, useState, useEffect } from "react";
import {
  Bot,
  Send,
  Loader2,
  Sparkles,
  Brain,
  User,
  MessageCircle,
  Zap,
  ChevronDown,
  Copy,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { api } from "../../../../utils/Axios";
import BottomNav from "../../../../components/bottomBar";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";

const AiPromptPanel = () => {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const responseEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const suggestions = [
    "What are common tomato diseases?",
    "How to treat powdery mildew?",
  ];

  useEffect(() => {
    if (showTypewriter && responseEndRef.current) {
      responseEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiResponse, showTypewriter]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setShowSuggestions(!e.target.value.trim());
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
  };

  const copyResponse = async () => {
    try {
      await navigator.clipboard.writeText(aiResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setAiResponse("");
    setError("");
    setShowTypewriter(false);
    setShowSuggestions(false);

    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);

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

  const resetChat = () => {
    setPrompt("");
    setAiResponse("");
    setError("");
    setShowTypewriter(false);
    setShowSuggestions(true);
  };

  return (
    <>
     {/* Top Nav */}
<div className="fixed top-0 left-0 flex items-center  shadow-lg px-4 py-4 bg-white w-full h-14 z-50">
  <Link href="/ai/prompt" className="flex items-center gap-2">
    <HiArrowLeft className="text-black text-xl" />
  </Link>
  <h2 className="absolute left-1/3 transform -translate-x-1/2 text-black font-semibold text-base sm:text-lg truncate">
    AI Plant Disease Specialist
  </h2>
</div>


      {/* Page Container */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center py-24 px-4">
        {/* Chat Container */}
        <div className="w-full max-w-4xl flex flex-col h-[calc(100vh-200px)] bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="relative px-8 py-6 bg-gradient-to-r from-green-100 via-emerald-50 to-green-100 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-green-200 to-emerald-100 border border-green-300">
                    <Brain className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">
                  AI Plant Disease Specialist
                </h1>
              </div>

              {(aiResponse || error) && (
                <button
                  onClick={resetChat}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-xl transition-all duration-200 border border-green-300"
                >
                  <RefreshCw className="w-4 h-4" /> New Chat
                </button>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div
            ref={chatContainerRef}
            className="flex-1 px-8 py-6 overflow-y-auto custom-scrollbar space-y-6"
          >
            {/* Welcome */}
            {!aiResponse && !error && !isProcessing && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="relative mb-8">
                  <div className="p-6 rounded-3xl bg-green-100 border border-green-300">
                    <Sparkles className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Welcome to AI Plant Care
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
                  I'm your intelligent plant disease specialist. Ask me about
                  plant health, disease identification, treatment recommendations,
                  or prevention strategies.
                </p>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-3xl">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <MessageCircle className="w-6 h-6 text-green-600 mb-2" />
                    <h3 className="text-gray-800 font-semibold mb-1">
                      Expert Diagnosis
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Get accurate plant disease identification
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <Zap className="w-6 h-6 text-green-600 mb-2" />
                    <h3 className="text-gray-800 font-semibold mb-1">
                      Fast Treatment
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Receive immediate treatment advice
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <Brain className="w-6 h-6 text-green-600 mb-2" />
                    <h3 className="text-gray-800 font-semibold mb-1">
                      AI Powered
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Advanced machine learning insights
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* User Message */}
            {prompt && !isProcessing && (aiResponse || error) && (
              <div className="flex gap-4 items-start animate-slideUp">
                <div className="p-3 rounded-2xl bg-blue-100 border border-blue-200">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 text-gray-800 rounded-2xl px-6 py-4 shadow border border-gray-200">
                    <span className="text-xs text-blue-600 font-medium">
                      You asked
                    </span>
                    <p className="mt-2">{prompt}</p>
                  </div>
                </div>
              </div>
            )}

            {/* AI Response */}
            {aiResponse && (
              <div className="flex gap-4 items-start animate-slideUp">
                <div className="p-3 rounded-2xl bg-green-100 border border-green-200">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 text-gray-800 rounded-2xl px-6 py-4 shadow border border-gray-200 relative group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-green-600 font-medium">
                        AI Response
                      </span>
                      <button
                        onClick={copyResponse}
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition-all"
                      >
                        {copied ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="font-sans leading-relaxed whitespace-pre-line">
                      {showTypewriter ? (
                        <Typewriter
                          words={[aiResponse]}
                          typeSpeed={15}
                          cursor
                          cursorStyle="_"
                          cursorColor="#059669"
                        />
                      ) : (
                        aiResponse
                      )}
                    </div>
                    <div ref={responseEndRef} />
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex gap-4 items-start animate-slideUp">
                <div className="p-3 rounded-2xl bg-red-100 border border-red-200">
                  <Bot className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="bg-red-50 text-red-600 rounded-2xl px-6 py-4 shadow border border-red-200">
                    <span className="text-xs font-medium uppercase">Error</span>
                    <p className="mt-2">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            {showSuggestions && suggestions.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-600 text-sm mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-600" /> Try asking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-3 py-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg text-sm border border-green-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder="Describe your plant issue..."
                  className="w-full bg-white border border-gray-300 rounded-2xl px-6 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none min-h-[60px] max-h-32"
                  disabled={isProcessing}
                  maxLength={500}
                  rows={1}
                  style={{ height: "auto", minHeight: "60px" }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height =
                      Math.min(e.target.scrollHeight, 128) + "px";
                  }}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {prompt.length}/500
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || !prompt.trim()}
                className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow disabled:opacity-50 flex items-center justify-center"
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
};

export default AiPromptPanel;
