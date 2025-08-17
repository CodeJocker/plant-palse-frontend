
import ActionButtonComponents from './ActionButtonComponents';

const PhotoPreviewModal = ({ photo , closePreview , handleRetake , handleUsePhoto }) => {
  return (
    <div>
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
            <ActionButtonComponents
              handleRetake={handleRetake}
              handleUsePhoto={handleUsePhoto}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoPreviewModal