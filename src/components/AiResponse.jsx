"use client";

import { useState, useRef } from "react";
import {
  Sparkles,
  Loader2,
  X,
  Leaf,
  FileText,
  MapPin,
  ImageIcon,
  Bot,
  Brain,
  Camera,
  Upload,
  CheckCircle,
  AlertCircle,
  Microscope,
  Zap,
  Eye,
  Copy,
} from "lucide-react";

const initialForm = {
  plantType: "",
  symptoms: "",
  location: "",
};

const AiResponse = ({
  open,
  onClose,
  simulateAIResponse,
  isProcessing,
  aiResponse,
  error,
}) => {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef();

  if (!open) return null;

  // Handle form field change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    simulateAIResponse(e, form, image);
  };

  // Copy response
  const copyResponse = async () => {
    try {
      await navigator.clipboard.writeText(aiResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Remove image
  const removeImage = () => {
    setImage(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="relative bg-gradient-to-br from-[#0f1419] via-[#1a1f26] to-[#0f1419] rounded-3xl shadow-2xl border border-green-400/30 max-w-6xl w-full mx-4 max-h-[95vh] overflow-hidden">
          {/* Enhanced Header */}
          <div className="relative px-8 py-6 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-green-500/10 border-b border-green-400/20">
            <button
              className="absolute top-6 right-6 p-2 rounded-full bg-[#2a2d34]/80 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all duration-200 backdrop-blur-sm border border-gray-600/30"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-600/30 border border-green-400/30 backdrop-blur-sm">
                  <Microscope className="w-8 h-8 text-green-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  AI Plant Disease Diagnosis
                </h2>
                <p className="text-green-400/80 text-sm font-medium mt-1">
                  Advanced Plant Health Analysis & Treatment Recommendations
                </p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
          </div>

          <div className="flex flex-col lg:flex-row overflow-hidden">
            {/* Left Panel: Input Form */}
            <div className="flex-1 p-8 bg-gradient-to-br from-[#1a1f26] to-[#23272f] overflow-y-auto max-h-[calc(95vh-100px)]">
              <div className="max-w-md mx-auto space-y-6">
                {/* Feature highlights */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="text-center p-3 bg-[#23272f]/50 rounded-xl border border-green-400/20">
                    <Brain className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">AI Powered</p>
                  </div>
                  <div className="text-center p-3 bg-[#23272f]/50 rounded-xl border border-blue-400/20">
                    <Zap className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">Instant Results</p>
                  </div>
                  <div className="text-center p-3 bg-[#23272f]/50 rounded-xl border border-purple-400/20">
                    <Eye className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">Visual Analysis</p>
                  </div>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Plant Type */}
                  <div className="space-y-2">
                    <label className="block text-white text-sm font-semibold">
                      Plant Type
                      <span className="text-red-400 ml-1">*</span>
                    </label>
                    <div className="relative group">
                      <Leaf className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400 w-5 h-5 group-focus-within:scale-110 transition-transform" />
                      <input
                        type="text"
                        name="plantType"
                        value={form.plantType}
                        onChange={handleChange}
                        placeholder="e.g., Tomato, Rose, Monstera..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#23272f] border border-[#2a2d34] text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 outline-none text-base transition-all duration-200 backdrop-blur-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div className="space-y-2">
                    <label className="block text-white text-sm font-semibold">
                      Symptoms & Observations
                      <span className="text-red-400 ml-1">*</span>
                    </label>
                    <div className="relative group">
                      <FileText className="absolute left-4 top-4 text-blue-400 w-5 h-5 group-focus-within:scale-110 transition-transform" />
                      <textarea
                        name="symptoms"
                        value={form.symptoms}
                        onChange={handleChange}
                        placeholder="Describe what you observe: yellowing leaves, spots, wilting, growth patterns, etc..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#23272f] border border-[#2a2d34] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 outline-none text-base min-h-[120px] resize-none transition-all duration-200 backdrop-blur-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="block text-white text-sm font-semibold">
                      Growing Environment
                    </label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5 group-focus-within:scale-110 transition-transform" />
                      <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Indoor, Outdoor, Greenhouse, Garden bed..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#23272f] border border-[#2a2d34] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 outline-none text-base transition-all duration-200 backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-3">
                    <label className="block text-white text-sm font-semibold">
                      Plant Images (Optional but Recommended)
                    </label>

                    {!imagePreview ? (
                      <div
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer group ${
                          dragActive
                            ? "border-green-400 bg-green-400/10"
                            : "border-[#2a2d34] hover:border-green-400/50 bg-[#23272f]/50"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="flex flex-col items-center space-y-3">
                          <div className="p-3 rounded-full bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                            <Upload className="w-8 h-8 text-green-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              Click to upload or drag & drop
                            </p>
                            <p className="text-gray-400 text-sm">
                              PNG, JPG, JPEG up to 10MB
                            </p>
                          </div>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="relative rounded-xl overflow-hidden border border-green-400/50">
                          <img
                            src={imagePreview}
                            alt="Plant preview"
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-3 right-3 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="mt-2 flex gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-sm transition-colors border border-green-400/20"
                          >
                            <Camera className="w-4 h-4" />
                            Change Image
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={
                      isProcessing ||
                      !form.plantType.trim() ||
                      !form.symptoms.trim()
                    }
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-base"
                  >
                    {isProcessing ? (
                      <>
                        <div className="relative">
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <div className="absolute inset-0 w-6 h-6 border border-white/30 rounded-full animate-ping" />
                        </div>
                        Analyzing Plant Health...
                      </>
                    ) : (
                      <>
                        <Microscope className="w-6 h-6" />
                        Start AI Diagnosis
                      </>
                    )}
                  </button>

                  {error && (
                    <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-400/30 rounded-xl text-red-400">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right Panel: AI Response */}
            <div className="flex-1 p-8 bg-gradient-to-br from-[#23272f] to-[#1a1f26] border-t lg:border-t-0 lg:border-l border-green-400/20 overflow-y-auto max-h-[calc(95vh-100px)]">
              <div className="max-w-2xl mx-auto h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/30 border border-blue-400/30">
                      <Brain className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        AI Analysis Results
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Expert diagnosis and treatment recommendations
                      </p>
                    </div>
                  </div>

                  {aiResponse && (
                    <button
                      onClick={copyResponse}
                      className="p-2 rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-400 transition-all duration-200 border border-green-400/20"
                      title="Copy diagnosis"
                    >
                      {copied ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Response Content */}
                <div className="flex-1 flex items-start">
                  {isProcessing ? (
                    <div className="w-full">
                      <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
                          <Brain className="w-6 h-6 text-green-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                      <div className="text-center space-y-3">
                        <p className="text-green-400 text-lg font-semibold">
                          AI is analyzing your plant...
                        </p>
                        <div className="flex justify-center gap-1">
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
                        <p className="text-gray-400">
                          Processing symptoms and environmental factors...
                        </p>
                      </div>
                    </div>
                  ) : aiResponse ? (
                    <div className="w-full">
                      <div className="bg-gradient-to-br from-[#23272f] to-[#1a1f26] rounded-2xl p-6 border border-green-400/20 shadow-2xl backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">
                            Diagnosis Complete
                          </span>
                        </div>
                        <div className="prose prose-invert max-w-none">
                          <div className="text-white text-base leading-relaxed whitespace-pre-line font-mono">
                            {aiResponse}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={copyResponse}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-xl transition-all duration-200 border border-green-400/20"
                        >
                          {copied ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          {copied ? "Copied!" : "Copy Results"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-center py-16">
                      <div className="mb-6">
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-gray-500/20 to-gray-600/30 border border-gray-400/30 backdrop-blur-sm inline-block">
                          <Bot className="w-12 h-12 text-gray-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Ready for Analysis
                      </h3>
                      <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                        Fill out the plant information on the left and click
                        "Start AI Diagnosis" to receive expert analysis and
                        treatment recommendations.
                      </p>

                      {/* Benefits */}
                      <div className="grid grid-cols-1 gap-3 mt-8 max-w-sm mx-auto">
                        <div className="flex items-center gap-3 p-3 bg-[#23272f]/50 rounded-lg border border-[#2a2d34]">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            Disease identification & severity
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-[#23272f]/50 rounded-lg border border-[#2a2d34]">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            Treatment recommendations
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-[#23272f]/50 rounded-lg border border-[#2a2d34]">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            Prevention strategies
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default AiResponse;
