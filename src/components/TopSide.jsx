
const TopSideComponent = ({ cameraReady }) => {
  return (
    <div className="flex items-center gap-2">
      {cameraReady && (
        <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs font-medium">Live</span>
        </div>
      )}
    </div>
  );
};

export default TopSideComponent;