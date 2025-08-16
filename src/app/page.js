"use client";

import { useRef, useState, useEffect } from "react";

export default function ProfessionalAICamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [showAIInput, setShowAIInput] = useState(false);
  const [search, setSearch] = useState("");
  const [usedPhoto, setUsedPhoto] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [history, setHistory] = useState([]);
  const [cameraReady, setCameraReady] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const startCamera = async () => {
      if (typeof navigator === "undefined" || !navigator.mediaDevices) {
        setError("Camera API not supported by this browser.");
        return;
      }

      try {
        let mediaStream;
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: facingMode,
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            },
            audio: false,
          });
        } catch (envError) {
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        }

        if (isMounted && videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
          try {
            await videoRef.current.play();
            setCameraReady(true);
          } catch (playError) {
            setError("Failed to play video: " + playError.message);
          }
        }
      } catch (err) {
        setError("Error accessing camera: " + err.message);
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const takePhoto = () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      setError("Video not ready. Please wait for the camera to load.");
      return;
    }

    // Flash effect
    if (flashEnabled) {
      const flash = document.createElement("div");
      flash.className = "fixed inset-0 bg-white z-50 opacity-0";
      document.body.appendChild(flash);
      flash.style.opacity = "1";
      setTimeout(() => {
        flash.style.opacity = "0";
        setTimeout(() => document.body.removeChild(flash), 200);
      }, 100);
    }

    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    setPhoto(imageData);
    setHistory((prev) => [
      ...prev,
      {
        image: imageData,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const closePreview = () => setPhoto(null);

  const handleUsePhoto = () => {
    setUsedPhoto(photo);
    setPhoto(null);
    setShowAIInput(true);
  };

  const handleAskAI = () => {
    setShowAIInput(true);
  };

  const handleRetake = () => {
    setPhoto(null);
    setUsedPhoto(null);
    setShowAIInput(false);
    setSearch("");
    setAiResponse("");
  };

  const handleCloseAIInput = () => {
    setShowAIInput(false);
    setUsedPhoto(null);
    setSearch("");
    setAiResponse("");
  };

  const simulateAIResponse = async () => {
    if (!search.trim()) return;

    setIsProcessing(true);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const responses = [
      "I can see this is an interesting image. The composition shows good lighting and detail.",
      "Based on the visual elements, this appears to be a well-captured photo with clear focus.",
      "The image quality is excellent. I notice several key features that stand out in this composition.",
      "This is a high-quality capture. The depth and clarity are particularly noteworthy.",
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    setAiResponse(response);

    // Add to history
    setHistory((prev) => [
      ...prev,
      {
        query: search,
        response: response,
        image: usedPhoto,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    setIsProcessing(false);
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
    setCameraReady(false);
  };

  const handleZoomChange = (e) => {
    setZoom(parseFloat(e.target.value));
  };

  // Gallery modal
  const handleGalleryPhotoClick = (img) => {
    setPhoto(img);
    setShowGallery(false);
  };

  return (
    <div className="relative w-screen h-screen bg-gray-900 overflow-hidden">
      {/* Professional Header */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">AI Vision Pro</h1>
            <p className="text-gray-300 text-xs">Intelligent Image Analysis</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {cameraReady && (
            <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">Live</span>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-2xl z-30 text-center text-sm font-medium border border-red-400/30">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Camera Controls Panel */}
      <div className="absolute top-20 right-6 flex flex-col gap-3 z-20">
        {/* Camera Flip */}
        <button
          onClick={toggleCamera}
          className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition border border-gray-600/30"
          title="Switch Camera"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 12l3-3 3 3M3 12l3 3 3-3M3 12h18" />
          </svg>
        </button>

        {/* Grid Toggle */}
        <button
          onClick={() => setGridVisible(!gridVisible)}
          className={`w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center transition border border-gray-600/30 ${
            gridVisible
              ? "bg-blue-500/40 text-blue-400"
              : "bg-black/40 text-white hover:bg-black/60"
          }`}
          title="Toggle Grid"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="9" y2="21" />
            <line x1="15" y1="9" x2="15" y2="21" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
          </svg>
        </button>

        {/* Flash Toggle */}
        <button
          onClick={() => setFlashEnabled(!flashEnabled)}
          className={`w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center transition border border-gray-600/30 ${
            flashEnabled
              ? "bg-yellow-500/40 text-yellow-400"
              : "bg-black/40 text-white hover:bg-black/60"
          }`}
          title="Toggle Flash"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </button>
      </div>

      {/* Zoom Control */}
      <div className="absolute top-20 left-6 flex flex-col items-center gap-2 z-20">
        <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-600/30">
          <span className="text-white text-sm font-medium">
            {zoom.toFixed(1)}x
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={zoom}
          onChange={handleZoomChange}
          className="w-24 h-2 bg-gray-600 rounded-lg appearance-none slider-thumb transform -rotate-90"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
              (zoom - 1) * 50
            }%, #4B5563 ${(zoom - 1) * 50}%, #4B5563 100%)`,
          }}
        />
      </div>

      {/* Grid Overlay */}
      {gridVisible && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="33.333"
                height="33.333"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 33.333 0 L 33.333 33.333 M 0 33.333 L 33.333 33.333"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="0.2"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      )}

      {/* Camera Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        playsInline
        muted
        style={{ transform: `scale(${zoom})` }}
      />

      {/* AI Input Panel */}
      {showAIInput && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-40">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={handleCloseAIInput}
              className="absolute top-3 right-3 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-gray-700 transition z-10"
              title="Close"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            {usedPhoto && (
              <div className="p-4 border-b border-gray-200/50">
                <img
                  src={usedPhoto}
                  alt="Analyzing"
                  className="w-full h-32 object-cover rounded-xl"
                />
              </div>
            )}

            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Describe what you want to analyze..."
                  className="flex-1 px-3 py-2 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                  onKeyPress={(e) => e.key === "Enter" && simulateAIResponse()}
                />
                <button
                  onClick={simulateAIResponse}
                  disabled={isProcessing || !search.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-sm">Analyzing...</span>
                    </div>
                  ) : (
                    "Analyze"
                  )}
                </button>
              </div>

              {aiResponse && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200/50">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        width="12"
                        height="12"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {aiResponse}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGallery && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
          <div className="relative bg-white/95 rounded-2xl shadow-2xl p-6 max-w-lg w-[90%]">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-3 right-3 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-gray-700 transition"
              title="Close Gallery"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Gallery</h2>
            {history.length === 0 ? (
              <div className="text-gray-500 text-center py-8">No photos yet.</div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {history
                  .filter((item) => item.image)
                  .map((item, idx) => (
                    <button
                      key={idx}
                      className="focus:outline-none"
                      onClick={() => handleGalleryPhotoClick(item.image)}
                      title={`Taken at ${item.timestamp}`}
                    >
                      <img
                        src={item.image}
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200 hover:scale-105 transition"
                      />
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Professional Bottom Controls */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent pb-8 pt-12 z-20">
        <div className="flex flex-col items-center gap-6">
          {/* Main Controls */}
          <div className="flex items-center justify-center gap-12">
            {/* Gallery Button */}
            <button
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              title="Gallery"
              onClick={() => setShowGallery(true)}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </button>

            {/* Capture Button */}
            <button
              onClick={takePhoto}
              className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 relative overflow-hidden"
              title="Capture"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.32-.07.65-.07.97c0 .32.03.65.07.97L2.46 14.6c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.31.61.22l2.49-1c.52.39 1.06.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.25 1.17-.59 1.69-.98l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z" />
                </svg>
              </div>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={handleAskAI}
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center text-white hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
              disabled={showAIInput}
              title="AI Assistant"
            >
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </button>
          </div>

          {/* Mode Indicator */}
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>AI Vision Mode</span>
          </div>
        </div>
      </div>

      {/* Enhanced Photo Preview Modal */}
      {photo && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="relative max-w-md w-full mx-4">
            <img
              src={photo}
              alt="Captured"
              className="w-full aspect-square object-cover rounded-3xl shadow-2xl border-4 border-white/10"
            />

            {/* Close Button */}
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition"
              title="Close"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleRetake}
                className="flex-1 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition"
              >
                Retake
              </button>
              <button
                onClick={handleUsePhoto}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition"
              >
                Analyze with AI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}