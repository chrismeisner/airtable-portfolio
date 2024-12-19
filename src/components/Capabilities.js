// File: /src/components/Capabilities.js

import React from "react";

const Capabilities = () => {
  const capabilities = [
	{
	  title: "Startup Strategy & Foundational Branding",
	  description:
		"Establish a robust brand identity and communication framework tailored to your startup's vision. / Lightweight",
	  points: [
		"Initial Logo Design",
		"Typography & Color Style Guide",
		"Pitch Decks & Presentation Templates",
		"Hero Screens",
		"Market Brand Analysis",
		"User Persona Definition",
	  ],
	},
	{
	  title: "User Experience & Interface Design",
	  description:
		"Create intuitive and visually appealing interfaces for your web and mobile applications..",
	  points: [
		"User flows / Wireframes",
		"UI / UX Responsive Designs",
		"Web / iOS",
		"High Fidelity Screens",
	  ],
	},
	{
	  title: "Product Prototyping & Development",
	  description:
		"Develop and deploy scalable prototypes that are easy to maintain and extend, ensuring seamless transitions for future development.",
	  points: [
		"React JS Development for Single Page Applications (SPA)",
		"Seamless handoff for future developers using React and simple HTML/JS",
		"Airtable Integration for robust database solutions",
	  ],
	},
  ];

  return (
	<div className="py-12 bg-white">
	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
		  {capabilities.map((capability, index) => (
			<div
			  key={index}
			  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
			>
			  <h3 className="text-xl font-semibold mb-4">
				{capability.title}
			  </h3>
			  <p className="text-gray-600 mb-4">{capability.description}</p>
			  <ul className="space-y-2">
				{capability.points.map((point, i) => (
				  <li key={i} className="text-gray-700">{point}</li>
				))}
			  </ul>
			</div>
		  ))}
		</div>
	  </div>
	</div>
  );
};

export default Capabilities;

// File: /src/components/Capabilities.css

/* Tailwind CSS included directly in the JSX */
