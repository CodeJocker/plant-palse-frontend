

const GridOverlay = ({ gridVisible }) => {
  return (
    <div>
      {" "}
      {gridVisible && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="33.333"
                height="33.333"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 33.333 0 L 33.333 33.333 M 0 33.333 L 33.333 33.333"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="0.2"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default GridOverlay