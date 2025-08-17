"use client";
import { useRef, useState, useEffect } from "react";

export const useContentWrapper = () => {
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

  return {
    videoRef,
    canvasRef,
    photo,
    setPhoto,
    stream,
    setStream,
    error,
    setError,
    showAIInput,
    setShowAIInput,
    search,
    setSearch,
    usedPhoto,
    setUsedPhoto,
    isProcessing,
    setIsProcessing,
    aiResponse,
    setAiResponse,
    history,
    setHistory,
    cameraReady,
    setCameraReady,
    facingMode,
    setFacingMode,
    flashEnabled,
    setFlashEnabled,
    gridVisible,
    setGridVisible,
    zoom,
    setZoom,
    showGallery,
    setShowGallery,
    takePhoto,
    closePreview,
    handleUsePhoto,
    handleAskAI,
    handleRetake,
    handleCloseAIInput,
    toggleCamera,
    handleZoomChange,
    handleGalleryPhotoClick,
  };
};