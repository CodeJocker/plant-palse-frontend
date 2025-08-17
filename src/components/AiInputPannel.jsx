"use client";
import { useState } from "react";
import { Loader2, Bot, X } from "lucide-react";
import { api } from "../utils/Axios";

const AiInputPannel = ({ showAIInput, handleCloseAIInput, usedPhoto }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState("");

  const handlePredict = async () => {
    setIsProcessing(true);
    setAiResponse("");
    setError("");

    try {
      const formData = new FormData();
      if (usedPhoto) formData.append("image", usedPhoto);

      const res = await api.post("/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAiResponse(res.data?.message || "Prediction complete!");
    } catch (err) {
      setError("Error contacting prediction service.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!showAIInput) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[2px]">
      <div className="relative bg-[#181c20] rounded-3xl shadow-2xl border border-green-400/30 max-w-lg w-full p-6">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-green-500 transition"
          onClick={handleCloseAIInput}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Preview */}
        {usedPhoto && (
          <img
            src={
              typeof usedPhoto === "string"
                ? usedPhoto
                : URL.createObjectURL(usedPhoto)
            }
            alt="Preview"
            className="w-full h-64 object-cover rounded-xl border border-green-400 mb-4"
          />
        )}

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-green-600 to-green-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Bot className="w-5 h-5" />
              Predict
            </>
          )}
        </button>

        {/* Response */}
        {aiResponse && (
          <div className="mt-4 p-3 bg-[#23272f] text-white rounded-lg border border-green-400">
            {aiResponse}
          </div>
        )}
        {error && <div className="mt-4 text-red-400 text-sm">{error}</div>}
      </div>
    </div>
  );
};

export default AiInputPannel;
