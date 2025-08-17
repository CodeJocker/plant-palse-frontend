

const BottomControlls = ({ setShowGallery , takePhoto , handleAskAI , showAIInput }) => {
  return (
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
            <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center">
              {/* <Settings /> */}
            </div>
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={handleAskAI}
            className="w-12 h-12 bg-green-800 rounded-xl shadow-lg flex items-center justify-center text-white hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
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
  );
}

export default BottomControlls