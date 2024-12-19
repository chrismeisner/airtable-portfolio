// File: /src/components/Process.js

import React from "react";

const Process = () => {
  const steps = [
	{
	  title: "Align & Define",
	  description:
		"Just like setting your sights on a target, we establish a clear vision and define the scope to ensure precise alignment.",
	  points: [
		"Set the target: Define project vision and objectives",
		"Measure the distance: Estimate project timeline and weekly velocity",
		"Schedule kickoff: Plan the initial Monday to launch the project",
	  ],
	  links: [
		{ text: "Project Discovery Alignment FigJam", url: "#" },
		{ text: "Project Request Form", url: "#" },
		{ text: "Project Estimate Calculator", url: "#" },
	  ],
	},
	{
	  title: "Build & Iterate",
	  description:
		"Pulling back the bow each week, we aim and release focused efforts to drive continuous progress toward your target.",
	  points: [
		"Weekly sessions: Design and development focused on project goals",
		"Monday syncs: Review last week's progress and set new weekly targets",
		"Release the arrow: Execute the planned tasks to move closer to your vision",
	  ],
	},
	{
	  title: "Review & Evolve",
	  description:
		"Inspect each shot by reviewing progress, ensuring we’re on target, and adjusting our aim for continuous improvement.",
	  points: [
		"Weekly recaps: Loom videos detailing progress and insights",
		"Assess accuracy: Evaluate how close we are to achieving weekly goals",
		"Adjust aim: Refine project scope and velocity based on feedback",
	  ],
	},
  ];

  return (
	<div className="py-12 bg-white">
	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
		  {steps.map((step, index) => (
			<div
			  key={index}
			  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
			>
			  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
			  <p className="text-gray-600 mb-4">{step.description}</p>
			  <ul className="space-y-2 mb-4">
				{step.points.map((point, i) => (
				  <li key={i} className="text-gray-700">
					{point}
				  </li>
				))}
			  </ul>
			  {step.links && (
				<div className="space-y-2">
				  {step.links.map((link, i) => (
					<a
					  key={i}
					  href={link.url}
					  className="text-indigo-600 hover:underline text-sm"
					>
					  {link.text}
					</a>
				  ))}
				</div>
			  )}
			</div>
		  ))}
		</div>
	  </div>
	</div>
  );
};

export default Process;
