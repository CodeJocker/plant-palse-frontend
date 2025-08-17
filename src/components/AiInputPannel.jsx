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

    const res = await axios.post("http://localhost:8000/predict", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setAiResponse(res.data);
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
      <div className="relative bg-white rounded-3xl shadow-2xl border border-green-300 max-w-lg w-full p-6">
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
{/* Response */}
{aiResponse && (
  <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-400 shadow">
    <h3 className="font-bold text-green-700 text-lg mb-2">
      ✅ Prediction Result
    </h3>
    {aiResponse.label ? (
      <p className="text-gray-800">
        <span className="font-semibold">Disease:</span>{" "}
        {aiResponse.label}
        <br />
        <span className="font-semibold">Confidence:</span>{" "}
        {(aiResponse.confidence * 100).toFixed(2)}%
      </p>
    ) : (
      <pre className="text-sm text-gray-600 whitespace-pre-wrap">
        {JSON.stringify(aiResponse, null, 2)}
      </pre>
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
