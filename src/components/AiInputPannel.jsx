"use client";
import { useRef, useState } from "react";
import {
  Bot,
  FileText,
  ImageIcon,
  Leaf,
  Loader2,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import { useContentWrapper } from "./ContentWrapper";
import { api } from "../utils/Axios";
import { Typewriter } from "react-simple-typewriter";

const initialForm = {
  plantType: "",
  symptoms: "",
  location: "",
};

const AiInputPannel = ({
  showAIInput,
  handleCloseAIInput,
  usedPhoto,
  onClose,
}) => {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [showTypewriter, setShowTypewriter] = useState(false);
  const fileInputRef = useRef();

  // Use your context/hook for AI state and actions
  const {
    isProcessing,
    aiResponse,
    error,
    setError,
    setIsProcessing,
    setAiResponse,
    setHistory,
  } = useContentWrapper();

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
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  // Submit form and send to AI
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setAiResponse("");
    setError("");
    setShowTypewriter(false);

    try {
      const formData = new FormData();
      formData.append("plantType", form.plantType);
      formData.append("symptoms", form.symptoms);
      formData.append("location", form.location);
      if (image) formData.append("image", image);
      else if (usedPhoto) formData.append("image", usedPhoto);

      const res = await api.post("/ai/diagnose", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = res.data;
      setAiResponse(
        data?.data?.diagnosis ||
          data?.data?.response ||
          data?.message ||
          "No diagnosis available."
      );
      setShowTypewriter(true);

      setHistory((prev) => [...prev, { form, aiResponse: data }]);
    } catch (err) {
      setAiResponse("");
      setError("Sorry, there was a problem contacting the AI server.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!showAIInput) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[2px] w-full">
      <div className="relative bg-gradient-to-br from-[#181c20] via-[#23272f] to-[#181c20] rounded-3xl shadow-2xl border border-green-400/30 max-w-3xl w-full mx-2 p-0 overflow-hidden animate-fade-in">
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-green-500 transition"
          onClick={onClose || handleCloseAIInput}
          aria-label="Close"
        >
          <X className="w-7 h-7" />
        </button>
        <div className="flex flex-col md:flex-row h-[80vh]">
          {/* Left: Diagnosis Form */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-[#20262d] to-[#181c20]">
            <div className="flex items-center gap-3 mb-10">
              <Sparkles className="w-9 h-9 text-green-400" />
              <h2 className="text-3xl font-bold text-white tracking-tight">
                AI Plant Disease Diagnosis
              </h2>
            </div>
            <form className="space-y-7" onSubmit={handleSubmit}>
              {/* Plant Type */}
              <div>
                <label className="block text-gray-300 text-sm mb-1 font-semibold">
                  Plant Type
                </label>
                <div className="relative">
                  <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                  <input
                    type="text"
                    name="plantType"
                    value={form.plantType}
                    onChange={handleChange}
                    placeholder="e.g. Tomato"
                    className="w-full pl-12 pr-3 py-2.5 rounded-xl bg-[#23272f] border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none text-base"
                    required
                  />
                </div>
              </div>
              {/* Symptoms */}
              <div>
                <label className="block text-gray-300 text-sm mb-1 font-semibold">
                  Symptoms
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-blue-500 w-5 h-5" />
                  <textarea
                    name="symptoms"
                    value={form.symptoms}
                    onChange={handleChange}
                    placeholder="Describe the symptoms..."
                    className="w-full pl-12 pr-3 py-2.5 rounded-xl bg-[#23272f] border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[80px] resize-none"
                    required
                  />
                </div>
              </div>
              {/* Location */}
              <div>
                <label className="block text-gray-300 text-sm mb-1 font-semibold">
                  Location{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Greenhouse, Outdoor"
                    className="w-full pl-12 pr-3 py-2.5 rounded-xl bg-[#23272f] border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none text-base"
                  />
                </div>
              </div>
              {/* Upload Image */}
              <div>
                <label className="block text-gray-300 text-sm mb-1 font-semibold">
                  Upload Plant Image{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-green-700 to-green-500 text-white rounded-lg shadow hover:opacity-90 transition"
                  >
                    <ImageIcon className="w-5 h-5" />
                    {image ? "Change Image" : "Upload Image"}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-xl border border-green-400 shadow"
                    />
                  )}
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-green-600 to-green-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition text-base disabled:opacity-50 disabled:cursor-not-allowed"
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
              {error && (
                <div className="text-red-400 text-sm mt-2">{error}</div>
              )}
            </form>
          </div>
          {/* Right: AI Response */}
          <div className="flex-1 p-0 md:p-0 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#2a2d34] min-h-[350px] bg-gradient-to-br from-[#20262d] to-[#181c20]">
            <div className="flex items-center gap-3 px-8 pt-8 md:px-12 md:pt-12 mb-2">
              <Bot className="w-7 h-7 text-blue-400" />
              <h3 className="text-xl font-bold text-white tracking-tight">
                AI Diagnosis Output
              </h3>
            </div>
            <div className="flex-1 flex items-start px-4 md:px-8 pb-8 md:pb-12">
              <div className="w-full max-h-[55vh] overflow-y-auto custom-scrollbar">
                {isProcessing ? (
                  <div className="flex items-center gap-2 text-blue-300 text-base mt-8">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI is analyzing your input...
                  </div>
                ) : aiResponse ? (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex gap-3 flex-col items-start">
                      <div className="flex-shrink-0">
                        <div className="bg-gradient-to-br from-green-500 to-green-700 p-2 rounded-full shadow-lg border-2 border-green-300">
                          <Bot className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div className="flex-1s">
                        <div className="w-full bg-[#23272f] text-[#e6e6e6] rounded-2xl px-6 py-5 shadow border border-[#2a2d34] font-mono text-[1.07rem] leading-relaxed whitespace-pre-line relative">
                          {showTypewriter ? (
                            <Typewriter
                              words={[aiResponse]}
                              typeSpeed={18}
                              cursor
                              cursorStyle="|"
                            />
                          ) : (
                            ""
                          )}
                          <span className="absolute top-2 right-4 text-xs text-gray-500 font-sans">
                            AI
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 italic mt-8">
                    The AI diagnosis will appear here after you submit the form.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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
  );
};

export default AiInputPannel;
