"use client";
import { useEffect, useState } from "react";
import {
  Bot,
  Loader2,
  X,
  Calendar,
  Tag,
  MessageSquare,
  Brain,
  Copy,
  CheckCircle,
} from "lucide-react";
import { api } from "../../../../utils/Axios";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const { PromptId } = params; // Extract dynamic route param from params
  const router = useRouter(); // Use router for navigation

  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState("");

  // Define onClose to navigate back or close the modal
  const onClose = () => {
    router.back(); // Navigate to the previous page
  };

  useEffect(() => {
    const fetchPrompt = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/ai/prompts/${PromptId}`);
        setPrompt(res.data?.data || null);
      } catch (err) {
        setError("Failed to fetch prompt details.");
      } finally {
        setLoading(false);
      }
    };
    if (PromptId) fetchPrompt();
  }, [PromptId]);

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      general: "from-blue-500 to-blue-600",
      diagnosis: "from-red-500 to-red-600",
      treatment: "from-green-500 to-green-600",
      prevention: "from-yellow-500 to-yellow-600",
      disease_info: "from-purple-500 to-purple-600",
      ai_treatment: "from-emerald-500 to-emerald-600",
    };
    return colors[type] || "from-gray-500 to-gray-600";
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="relative bg-gradient-to-br from-[#1a1f26] via-[#23272f] to-[#1a1f26] rounded-3xl shadow-2xl border border-green-400/30 max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-[#2a2d34]/80 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all duration-200 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 px-8 pt-8 pb-6 border-b border-[#2a2d34]/50">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/30 border border-green-400/30">
              <Bot className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                AI Conversation Details
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Review your plant disease consultation
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-200px)] custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
                  <Bot className="w-6 h-6 text-green-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-gray-400 mt-4 text-lg">
                  Loading conversation details...
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="p-4 rounded-full bg-red-500/20 border border-red-400/30 mb-4">
                  <X className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-red-400 text-lg font-medium">{error}</p>
              </div>
            ) : prompt ? (
              <div className="space-y-6">
                {/* Metadata Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#23272f] rounded-xl p-4 border border-[#2a2d34]">
                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Type</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${getTypeColor(
                              prompt.promptType
                            )}`}
                          ></span>
                          <span className="text-white font-medium capitalize">
                            {prompt.promptType || "General"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#23272f] rounded-xl p-4 border border-[#2a2d34]">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Date</p>
                        <p className="text-white font-medium">
                          {formatDate(prompt.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#23272f] rounded-xl p-4 border border-[#2a2d34]">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Status</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                          <span className="text-white font-medium">
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversation Thread */}
                <div className="space-y-6">
                  {/* User Prompt */}
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-full shadow-lg border-2 border-blue-400/30">
                        <span className="font-bold text-white text-sm">
                          You
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-[#23272f] text-[#e6e6e6] rounded-2xl px-6 py-4 shadow border border-[#2a2d34] relative group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500 font-sans">
                            Your Question
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                prompt.userPrompt || prompt.symptoms || "",
                                "prompt"
                              )
                            }
                            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[#2a2d34] transition-all duration-200"
                            title="Copy prompt"
                          >
                            {copiedField === "prompt" ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                        <div className="font-sans text-base leading-relaxed whitespace-pre-line">
                          {prompt.userPrompt || prompt.symptoms || (
                            <span className="italic text-gray-500">
                              No prompt available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-gradient-to-br from-green-500 to-green-700 p-3 rounded-full shadow-lg border-2 border-green-400/30">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-[#23272f] text-[#e6e6e6] rounded-2xl px-6 py-4 shadow border border-[#2a2d34] relative group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500 font-sans">
                            AI Response
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                prompt.aiResponse || prompt.diagnosis || "",
                                "response"
                              )
                            }
                            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[#2a2d34] transition-all duration-200"
                            title="Copy response"
                          >
                            {copiedField === "response" ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                        <div className="font-mono text-base leading-relaxed whitespace-pre-line">
                          {prompt.aiResponse || prompt.diagnosis || (
                            <span className="italic text-gray-500">
                              No response available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {(prompt.plantType || prompt.diseaseType) && (
                  <div className="mt-8 p-6 bg-[#23272f] rounded-xl border border-[#2a2d34]">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-green-400" />
                      Additional Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {prompt.plantType && (
                        <div>
                          <span className="text-gray-400 text-sm">
                            Plant Type:
                          </span>
                          <p className="text-white font-medium">
                            {prompt.plantType}
                          </p>
                        </div>
                      )}
                      {prompt.diseaseType && (
                        <div>
                          <span className="text-gray-400 text-sm">
                            Disease Type:
                          </span>
                          <p className="text-white font-medium">
                            {prompt.diseaseType}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="p-4 rounded-full bg-gray-500/20 border border-gray-400/30 mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-400 text-lg">No prompt data found</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-[#2a2d34]/50 bg-[#1a1f26]/50">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a2d34;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #34393f;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  );
};

export default Page;
