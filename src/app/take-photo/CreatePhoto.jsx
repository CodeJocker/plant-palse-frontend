"use client";

import AiResponse from "../../components/AiResponse";
// import ActionButtonComponents from "../../components/ActionButtonComponents";
import CameraControll from "../../components/CameraControll";
import TopSideComponent from "../../components/TopSide";
import { CheckLine } from "lucide-react";
import GalleryModal from "../../components/GalleryModal";
import GridOverlay from "../../components/GridOverlay";
import BottomControlls from "../../components/BottomControlls";
import PhotoPreviewModal from "../../components/PhotoPreviewModal";
import AiInputPannel from "../../components/AiInputPannel";
import { useContentWrapper } from "../../components/ContentWrapper";

export default function ProfessionalAICamera() {
  const {
    cameraReady,
    error,
    flashEnabled,
    setFlashEnabled,
    setGridVisible,
    toggleCamera,
    gridVisible,
    videoRef,
    handleCloseAIInput,
    usedPhoto,
    showGallery,
    handleGalleryPhotoClick,
    handleAskAI,
    setShowGallery,
    showAIInput,
    takePhoto,
    closePreview,
    handleRetake,
    handleUsePhoto,
    photo,
    canvasRef,
    zoom,
    history
  } = useContentWrapper();

  return (
    <div className="relative w-screen h-screen bg-green-900 overflow-hidden">
      {/* Professional Header */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <CheckLine />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">AI Vision Pro</h1>
            <p className="text-gray-300 text-xs">Intelligent Image Analysis</p>
          </div>
        </div>

        <TopSideComponent cameraReady={cameraReady} />
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
      <CameraControll
        flashEnabled={flashEnabled}
        gridVisible={gridVisible}
        setFlashEnabled={setFlashEnabled}
        setGridVisible={setGridVisible}
        toggleCamera={toggleCamera}
      />
      {/* Zoom Control */}
      {/* <div className="absolute top-20 left-6 flex flex-col items-center gap-2 z-20">
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
      </div> */}

      {/* Grid Overlay */}
      <GridOverlay gridVisible={gridVisible} />

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
      <AiInputPannel
        handleCloseAIInput={handleCloseAIInput}
        showAIInput={showAIInput}
        usedPhoto={usedPhoto}
      />

      {/* Gallery Modal */}
      <GalleryModal
        history={history}
        setShowGallery={setShowGallery}
        showGallery={showGallery}
        handleGalleryPhotoClick={handleGalleryPhotoClick}
      />
      {/* Professional Bottom Controls */}
      <BottomControlls
        handleAskAI={handleAskAI}
        setShowGallery={setShowGallery}
        showAIInput={showAIInput}
        takePhoto={takePhoto}
      />
      {/* Enhanced Photo Preview Modal */}
      <PhotoPreviewModal
        closePreview={closePreview}
        handleRetake={handleRetake}
        handleUsePhoto={handleUsePhoto}
        photo={photo}
      />
      {/* Hidden Canvas */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
