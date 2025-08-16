

const AiResponse = ({ search , setSearch , simulateAIResponse , isProcessing , aiResponse  }) => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center">
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
          className="px-4 py-2 bg-green-800 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
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
              <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
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
  );
}

export default AiResponse