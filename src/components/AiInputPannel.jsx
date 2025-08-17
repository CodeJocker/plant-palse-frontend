"use client";
import { useRef, useState } from "react";
import {
  Bot,
  FileText,
  Image,
  Leaf,
  Loader2,
  MapPin,
  Sparkles,
  X,
  Camera,
  Upload,
  CheckCircle,
  AlertCircle,
  Stethoscope
} from "lucide-react";

const initialForm = {
  plantType: "",
  symptoms: "",
  location: "",
};

const AiInputPanel = ({
  showAIInput = true,
  handleCloseAIInput,
  usedPhoto,
  onClose,
}) => {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef();

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

    // Simulate AI processing
    setTimeout(() => {
      const mockResponse = `Based on the provided information and image analysis, I've identified several potential issues with your ${form.plantType || 'plant'}:

**Primary Diagnosis:** Bacterial Leaf Spot
**Confidence Level:** 87%

**Symptoms Analysis:**
- ${form.symptoms || 'Visual symptoms observed in the image'}
- Characteristic brown/black spots with yellow halos
- Progressive leaf deterioration pattern

**Treatment Recommendations:**
1. Remove affected leaves immediately
2. Apply copper-based fungicide every 7-14 days
3. Improve air circulation around the plant
4. Water at soil level to avoid wetting leaves
5. Monitor for 2-3 weeks for improvement

**Prevention Measures:**
- Maintain proper spacing between plants
- Ensure adequate drainage
- Regular inspection for early detection

**Follow-up:** If symptoms persist after 2 weeks of treatment, consider soil testing for nutrient deficiencies.`;

      setAiResponse(mockResponse);
      setShowTypewriter(true);
      setIsProcessing(false);
    }, 3000);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!showAIInput) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-6xl w-full max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Stethoscope className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">AI Plant Health Diagnosis</h2>
              <p className="text-sm text-gray-600">Advanced plant disease detection and treatment recommendations</p>
            </div>
          </div>
          <button
            onClick={onClose || handleCloseAIInput}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Panel - Input Form */}
          <div className="flex-1 p-6 space-y-6 bg-gray-50">
            <div className="space-y-5">
              
              {/* Plant Type Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Plant Species *
                </label>
                <div className="relative">
                  <Leaf className="absolute left-3 top-3 w-5 h-5 text-emerald-500" />
                  <input
                    type="text"
                    name="plantType"
                    value={form.plantType}
                    onChange={handleChange}
                    placeholder="e.g., Tomato, Rose, Basil"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Symptoms Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Symptoms Description *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-blue-500" />
                  <textarea
                    name="symptoms"
                    value={form.symptoms}
                    onChange={handleChange}
                    placeholder="Describe what you're observing: discoloration, spots, wilting, growth issues, etc."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    rows={4}
                    required
                  />
                </div>
              </div>

              {/* Location Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Growing Environment
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-purple-500" />
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g., Indoor pot, Garden bed, Greenhouse"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Plant Photo
                </label>
                
                {!imagePreview ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-400 transition-colors cursor-pointer bg-white"
                  >
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-emerald-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Plant preview"
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      <CheckCircle className="w-3 h-3 inline mr-1" />
                      Image uploaded
                    </div>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isProcessing || !form.plantType || !form.symptoms}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Plant Health...
                  </>
                ) : (
                  <>
                    <Bot className="w-5 h-5" />
                    Get AI Diagnosis
                  </>
                )}
              </button>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - AI Response */}
          <div className="flex-1 flex flex-col border-l border-gray-200">
            
            {/* Response Header */}
            <div className="p-6 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Diagnosis Results</h3>
                  <p className="text-sm text-gray-600">AI-powered plant health analysis</p>
                </div>
              </div>
            </div>

            {/* Response Content */}
            <div className="flex-1 p-6 bg-white overflow-y-auto max-h-96">
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                    <Bot className="absolute inset-0 m-auto w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900 mb-2">Analyzing Your Plant</p>
                    <p className="text-sm text-gray-600">Our AI is examining the symptoms and image data...</p>
                  </div>
                </div>
              ) : aiResponse ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">Analysis Complete</span>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 font-mono text-sm leading-relaxed whitespace-pre-line">
                      {showTypewriter ? (
                        <TypewriterText text={aiResponse} />
                      ) : (
                        aiResponse
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <Sparkles className="w-4 h-4" />
                    <span>Analysis powered by advanced plant pathology AI</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <Stethoscope className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Ready for Analysis</p>
                    <p className="text-sm text-gray-600 max-w-sm">
                      Fill out the form and submit to receive a detailed AI diagnosis of your plant's health condition.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Typewriter effect component
const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useState(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
};

export default AiInputPanel;