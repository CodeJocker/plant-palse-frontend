"use client"
import React, { useState } from "react";
import { Sparkles, Loader2, Bot, FileText, Leaf, MapPin } from "lucide-react";
import axios from "axios";

const initialForm = {
  plantType: "",
  symptoms: "",
  location: "",
};

const DiagnosisPage = () => {
  const [form, setForm] = useState(initialForm);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDiagnose = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setAiResponse("");
    setError("");
    try {
      const res = await axios.post("/api/ai/diagnose", {
        plantType: form.plantType,
        symptoms: form.symptoms,
        location: form.location,
      });
      const data = res.data;
      setAiResponse(
        data?.data?.diagnosis ||
          data?.data?.response ||
          data?.message ||
          "No diagnosis available."
      );
    } catch (err) {
      setError("Sorry, there was a problem contacting the AI server.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-2 py-8">
      <div className="w-full max-w-5xl bg-black/80 rounded-3xl shadow-2xl border border-gray-800 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Diagnosis Form */}
        <div className="flex-1 p-8 md:p-10 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-green-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              AI Plant Disease Diagnosis
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleDiagnose}>
            <div>
              <label className="block text-gray-400 text-sm mb-1 font-medium">
                Plant Type
              </label>
              <div className="relative">
                <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4" />
                <input
                  type="text"
                  name="plantType"
                  value={form.plantType}
                  onChange={handleChange}
                  placeholder="e.g. Tomato"
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none text-base"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1 font-medium">
                Symptoms
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-blue-500 w-4 h-4" />
                <textarea
                  name="symptoms"
                  value={form.symptoms}
                  onChange={handleChange}
                  placeholder="Describe the symptoms (e.g. brown spots, yellowing leaves)..."
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[80px] resize-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1 font-medium">
                Location (optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 w-4 h-4" />
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Greenhouse, Outdoor, Region"
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none text-base"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-green-600 to-green-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Diagnosing...
                </>
              ) : (
                <>
                  <Bot className="w-5 h-5" />
                  Diagnose
                </>
              )}
            </button>
            {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
          </form>
        </div>
        {/* Right: AI Response */}
        <div className="flex-1 p-8 md:p-10 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-800 min-h-[350px]">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="w-7 h-7 text-blue-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">
              AI Diagnosis Output
            </h3>
          </div>
          <div className="flex-1 flex items-start">
            {isProcessing ? (
              <div className="flex items-center gap-2 text-blue-300 text-base">
                <Loader2 className="w-5 h-5 animate-spin" />
                AI is analyzing your input...
              </div>
            ) : aiResponse ? (
              <div className="bg-gradient-to-br from-blue-50/80 to-green-50/80 rounded-xl p-6 border border-blue-200/60 shadow text-gray-900 text-base leading-relaxed font-medium animate-fade-in">
                {aiResponse}
              </div>
            ) : (
              <div className="text-gray-400 italic">
                The AI diagnosis will appear here after you submit the form.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisPage;
