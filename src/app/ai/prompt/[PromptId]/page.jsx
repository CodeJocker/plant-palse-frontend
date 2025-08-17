"use client";
import { useEffect, useState } from "react";
import { Bot, Loader2 } from "lucide-react";
import axios from "axios";
import { api } from "../../../../utils/Axios";

const PromptDetail = ({ PromptId, onClose }) => {
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrompt = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/ai/prompts/${PromptId}`);
          setPrompt(res.data?.data || null);
          setLoading(false)
      } catch (err) {
        setError("Failed to fetch prompt details.");
      } finally {
        setLoading(false);
      }
    };
    if (PromptId) fetchPrompt();
  }, [PromptId]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="relative bg-gradient-to-br from-[#23272f] to-[#181c20] rounded-2xl shadow-2xl border border-green-400/40 max-w-lg w-full mx-2 p-0 overflow-hidden animate-fade-in">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-green-500 transition"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Bot className="w-7 h-7 text-green-400" />
              <h3 className="text-xl font-bold text-white tracking-tight">
                Prompt Details
              </h3>
            </div>
            {loading ? (
              <div className="flex items-center gap-2 text-blue-300 text-base mt-8">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading...
              </div>
            ) : error ? (
              <div className="text-red-400 text-sm mt-4">{error}</div>
            ) : (
              <div className="space-y-4 text-gray-200">
                <div>
                  <span className="font-semibold text-green-400">Prompt:</span>
                  <div className="bg-[#181c20] rounded-lg px-4 py-2 mt-1 text-base whitespace-pre-line">
                    {prompt.userPrompt || prompt.symptoms || (
                      <span className="italic text-gray-500">No prompt</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-green-400">
                    Response:
                  </span>
                  <div className="bg-[#181c20] rounded-lg px-4 py-2 mt-1 text-base whitespace-pre-line line-clamp-3">
                    {prompt.aiResponse || prompt.diagnosis || (
                      <span className="italic text-gray-500">No response</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div>
                    <span className="font-semibold text-gray-400">Type:</span>{" "}
                    <span className="capitalize">
                      {prompt.promptType || "—"}
                    </span>
                  </div>
                  {/* <div>
                  <span className="font-semibold text-gray-400">Plant:</span>{" "}
                  {prompt.plantType || "—"}
                </div> */}
                  <div>
                    <span className="font-semibold text-gray-400">Date:</span>{" "}
                    {prompt.createdAt
                      ? new Date(prompt.createdAt).toLocaleString()
                      : "—"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptDetail;
