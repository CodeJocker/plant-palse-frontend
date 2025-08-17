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
  Mic,
  Camera,
  Paperclip,
} from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { api } from "../../../../utils/Axios";
import BottomNav from "../../../../components/bottomBar";
import NavBar from "../../../../components/heading";

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

  // Predefined suggestions for better UX
  const suggestions = [
    "What are common tomato diseases?",
    "How to treat powdery mildew?",
  ];

  // Auto-scroll to bottom as the AI types
  useEffect(() => {
    if (showTypewriter && responseEndRef.current) {
      responseEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiResponse, showTypewriter]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    if (e.target.value.trim()) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
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

    // Scroll to show the conversation
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
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
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e13] via-[#1a1f26] to-[#0a0e13] flex flex-col items-center py-24 px-4">
        {/* Main Chat Container */}
        <div className="w-full max-w-4xl flex flex-col h-[calc(100vh-200px)] bg-gradient-to-br from-[#1a1f26] via-[#23272f] to-[#1a1f26] rounded-3xl shadow-2xl border border-green-400/20 overflow-hidden backdrop-blur-sm">
          {/* Enhanced Header */}
          <div className="relative px-8 py-6 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-green-500/10 border-b border-green-400/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-600/30 border border-green-400/30 backdrop-blur-sm">
                    <Brain className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    AI Plant Disease Specialist
                  </h1>
                </div>
              </div>

              {(aiResponse || error) && (
                <button
                  onClick={resetChat}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-xl transition-all duration-200 border border-green-400/20"
                >
                  <RefreshCw className="w-4 h-4" />
                  New Chat
                </button>
              )}
            </div>

            {/* Status Indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
          </div>

          {/* Chat Area */}
          <div
            ref={chatContainerRef}
            className="flex-1 px-8 py-6 overflow-y-auto custom-scrollbar space-y-6"
          >
            {/* Welcome Message */}
            {!aiResponse && !error && !isProcessing && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="relative mb-8">
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-green-500/20 to-emerald-600/30 border border-green-400/30 backdrop-blur-sm">
                    <Sparkles className="w-12 h-12 text-green-400" />
                  </div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/20 to-emerald-400/20 animate-pulse"></div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Welcome to AI Plant Care
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                  I'm your intelligent plant disease specialist. Ask me about
                  plant health, disease identification, treatment
                  recommendations, or prevention strategies.
                </p>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-3xl">
                  <div className="p-4 bg-[#23272f]/50 rounded-xl border border-green-400/20 backdrop-blur-sm">
                    <MessageCircle className="w-6 h-6 text-green-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">
                      Expert Diagnosis
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Get accurate plant disease identification
                    </p>
                  </div>
                  <div className="p-4 bg-[#23272f]/50 rounded-xl border border-green-400/20 backdrop-blur-sm">
                    <Zap className="w-6 h-6 text-green-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">
                      Fast Treatment
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Receive immediate treatment advice
                    </p>
                  </div>
                  <div className="p-4 bg-[#23272f]/50 rounded-xl border border-green-400/20 backdrop-blur-sm">
                    <Brain className="w-6 h-6 text-green-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">
                      AI Powered
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Advanced machine learning insights
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* User Message */}
            {prompt && !isProcessing && (aiResponse || error) && (
              <div className="flex gap-4 items-start animate-slideUp">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/30 border border-blue-400/30 backdrop-blur-sm">
                    <User className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-[#23272f] to-[#1a1f26] text-white rounded-2xl px-6 py-4 shadow-lg border border-[#2a2d34] backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-blue-400 font-medium uppercase tracking-wide">
                        You asked
                      </span>
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                    <p className="font-sans text-base leading-relaxed whitespace-pre-line">
                      {prompt}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* AI Processing */}
            {isProcessing && (
              <div className="flex gap-4 items-start animate-slideUp">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/30 border border-green-400/30 backdrop-blur-sm">
                    <Brain className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-[#23272f] to-[#1a1f26] text-green-300 rounded-2xl px-6 py-4 shadow-lg border border-green-400/20 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Loader2 className="w-5 h-5 animate-spin text-green-400" />
                        <div className="absolute inset-0 w-5 h-5 border border-green-400/30 rounded-full animate-ping"></div>
                      </div>
                      <span className="font-medium">
                        AI is analyzing your question...
                      </span>
                    </div>
                    <div className="mt-3 flex gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Response */}
            {aiResponse && (
              <div className="flex gap-4 items-start animate-slideUp">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/30 border border-green-400/30 backdrop-blur-sm">
                    <Brain className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-[#23272f] to-[#1a1f26] text-white rounded-2xl px-6 py-4 shadow-lg border border-green-400/20 backdrop-blur-sm relative group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-green-400 font-medium uppercase tracking-wide">
                          AI Response
                        </span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <button
                        onClick={copyResponse}
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-400 transition-all duration-200"
                        title="Copy response"
                      >
                        {copied ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="font-mono text-base leading-relaxed whitespace-pre-line">
                      {showTypewriter ? (
                        <Typewriter
                          words={[aiResponse]}
                          typeSpeed={15}
                          cursor
                          cursorStyle="_"
                          cursorColor="#10b981"
                          onType={() => {
                            if (responseEndRef.current) {
                              responseEndRef.current.scrollIntoView({
                                behavior: "smooth",
                              });
                            }
                          }}
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

            {/* Error Message */}
            {error && (
              <div className="flex gap-4 items-start animate-slideUp">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/30 border border-red-400/30 backdrop-blur-sm">
                    <Bot className="w-6 h-6 text-red-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 text-red-400 rounded-2xl px-6 py-4 shadow-lg border border-red-400/20 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Error
                      </span>
                    </div>
                    <p className="font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="px-8 py-6 bg-gradient-to-r from-[#1a1f26] via-[#23272f] to-[#1a1f26] border-t border-green-400/20">
            {/* Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Try asking about:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-2 bg-green-600/10 hover:bg-green-600/20 text-green-400 rounded-lg text-sm transition-all duration-200 border border-green-400/20"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder="Describe your plant issue, symptoms, or ask about plant care..."
                  className="w-full bg-[#23272f] border border-green-400/30 rounded-2xl px-6 py-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400 font-sans text-base leading-relaxed resize-none min-h-[60px] max-h-32 backdrop-blur-sm"
                  disabled={isProcessing}
                  maxLength={500}
                  rows={1}
                  style={{
                    height: "auto",
                    minHeight: "60px",
                  }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height =
                      Math.min(e.target.scrollHeight, 128) + "px";
                  }}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {prompt.length}/500
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isProcessing || !prompt.trim()}
                  className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 justify-center"
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Custom Styles */}
        <style jsx global>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideUp {
            animation: slideUp 0.4s ease-out;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #10b981, #059669);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #059669, #047857);
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(42, 45, 52, 0.3);
            border-radius: 10px;
          }
        `}</style>
      </div>
      <BottomNav />
    </>
  );
};

export default AiPromptPanel;
