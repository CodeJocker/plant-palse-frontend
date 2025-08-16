
const GalleryModal = ({ showGallery , setShowGallery , history ,handleGalleryPhotoClick  }) => {
  return (
    <div>
      {" "}
      {showGallery && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
          <div className="relative bg-white/95 rounded-2xl shadow-2xl p-6 max-w-lg w-[90%]">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-3 right-3 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-gray-700 transition"
              title="Close Gallery"
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
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Gallery
            </h2>
            {history.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                No photos yet.
              </div>
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
    </div>
  );
}

export default GalleryModal