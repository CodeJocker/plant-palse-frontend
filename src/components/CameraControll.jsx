
import { Grid2X2Icon, SwitchCamera } from "lucide-react";

const CameraControll = ({ toggleCamera , setGridVisible , gridVisible , setFlashEnabled , flashEnabled }) => {
  return (
    <div className="absolute top-20 right-6 flex flex-col gap-3 z-20">
      {/* Camera Flip */}
      <button
        onClick={toggleCamera}
        className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition border border-gray-600/30"
        title="Switch Camera"
      >
        <SwitchCamera />
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
        <Grid2X2Icon />
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
  );
};

export default CameraControll;
