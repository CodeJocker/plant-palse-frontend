"use client";

import { useState } from "react";
import { Loader2, Bot, X, AlertCircle } from "lucide-react";
import axios from "axios";

const AiInputPannel = ({ showAIInput, handleCloseAIInput, usedPhoto }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!usedPhoto) {
      setError("⚠️ Please upload an image before predicting.");
      return;
    }

    setIsProcessing(true);
    setAiResponse(null);
    setError("");

    try {
      const formData = new FormData();

      // ✅ If it's already a File, send directly
      if (usedPhoto instanceof File) {
        formData.append("file", usedPhoto);
      }
      // ✅ If it's a string (URL), fetch it and convert to Blob
      else if (typeof usedPhoto === "string") {
        const response = await fetch(usedPhoto);
        const blob = await response.blob();
        formData.append("file", blob, "image.jpg");
      }

      const res = await axios.post("http://localhost:5005/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAiResponse(res.data.result);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.details ||
          err.response?.data?.message ||
          "❌ Error contacting prediction service."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!showAIInput) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[2px]">
      <div className="py-20 relative bg-white rounded-3xl shadow-2xl border border-green-300 max-w-lg w-full p-6">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
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
          <div className="mt-6 p-6 bg-green-50 rounded-2xl border border-green-400 shadow-lg max-h-screen py-20 overflow-y-auto">
            <h3 className="font-bold text-green-800 text-xl mb-4 flex items-center gap-2">
              <Bot className="w-6 h-6" />✅ Prediction Result
            </h3>

            {/* Split the response into sections if possible */}
            {aiResponse.split("\n").map((line, index) => {
              // Highlight section headers like "Disease Name:", "Causes:", etc.
              const isHeader =
                /Disease Name:|Causes:|Prevention & Remedies:/i.test(line);
              return (
                <p
                  key={index}
                  className={`mb-2 ${
                    isHeader
                      ? "font-semibold text-green-700"
                      : "text-gray-800 pl-4"
                  }`}
                >
                  {line}
                </p>
              );
            })}

            {/* Optional: confidence badge */}
            {aiResponse.confidence && (
              <div className="mt-4 inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Confidence: {(aiResponse.confidence * 100).toFixed(2)}%
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-400 shadow flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiInputPannel;
