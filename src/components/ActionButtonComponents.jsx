
const ActionButtonComponents = ({ handleRetake , handleUsePhoto }) => {
  return (
    <div className="mt-8 flex gap-4">
      <button
        onClick={handleRetake}
        className="flex-1 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition"
      >
        Retake
      </button>
      <button
        onClick={handleUsePhoto}
        className="flex-1 py-4 rounded-2xl bg-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition"
      >
        Analyze with AI
      </button>
    </div>
  );
}

export default ActionButtonComponents