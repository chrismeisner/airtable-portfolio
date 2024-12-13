import React, { useState, useEffect } from 'react';

const ProgressBarLoader = ({ duration = 2000, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
	const interval = setInterval(() => {
	  setProgress((prev) => {
		const nextProgress = prev + 1;
		if (nextProgress >= 100) {
		  clearInterval(interval);
		  if (onComplete) onComplete(); // Notify parent when loading is complete
		}
		return nextProgress;
	  });
	}, duration / 100); // Adjust interval duration based on total duration

	return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
	<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
	  <div className="w-full max-w-[300px] bg-gray-300 rounded-full overflow-hidden">
		<div
		  className="bg-blue-500 h-4"
		  style={{
			width: `${progress}%`,
			transition: 'width 0.1s ease-in-out',
		  }}
		></div>
	  </div>
	  <span className="mt-2 text-gray-700">{progress}%</span>
	</div>
  );
};

export default ProgressBarLoader;
