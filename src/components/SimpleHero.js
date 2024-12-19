import React from "react";

const SimpleHero = () => {
  return (
	<div className="relative bg-white py-16 px-6 lg:px-8">
	  <div className="text-center max-w-3xl mx-auto">
		{/* Square Hero Image Placeholder */}
		<div className="w-48 h-48 mx-auto mb-8 bg-gray-300 rounded"></div>

		{/* Title */}
		<h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
		  Bringing ideas to life
		</h1>

		{/* Subtitle */}
		<p className="mt-6 text-lg text-gray-500">
		  Partnering with founders and product teams to turn concepts into
		  tangible designs and prototypes. We’ll move fast, iterate weekly, and
		  build a track record of delivered value you can always revisit. Fill
		  out a <a href="#" className="text-indigo-600 underline">Project Intake Form</a> or <a href="#" className="text-indigo-600 underline">Schedule a Discovery Call</a> if you’re interested in collaborating.
		</p>
	  </div>
	</div>
  );
};

export default SimpleHero;
