
import AiResponse from './AiResponse';
import { useContentWrapper } from './ContentWrapper';

const AiInputPannel = ({ showAIInput, handleCloseAIInput, usedPhoto, }) => {
  const { aiResponse , isProcessing , search , setSearch ,simulateAIResponse } = useContentWrapper()
  return (
    <div>
      {" "}
      {showAIInput && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-40">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={handleCloseAIInput}
              className="absolute top-3 right-3 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-gray-700 transition z-10"
              title="Close"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
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
            {/* ai response and usage here !! */}
            <AiResponse
              aiResponse={aiResponse}
              isProcessing={isProcessing}
              search={search}
              setSearch={setSearch}
              simulateAIResponse={simulateAIResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AiInputPannel