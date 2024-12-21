// src/components/Capabilities.js

import React from "react";
import PropTypes from "prop-types";

const Capabilities = ({ capabilities }) => {
  return (
	<div className="py-12 bg-white rounded-lg shadow-md">
	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
		  {capabilities.map((capability, index) => (
			<div
			  key={index}
			  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
			>
			  <h3 className="text-xl font-semibold mb-4">{capability.title}</h3>
			  <p className="text-gray-600 mb-4">{capability.description}</p>
			  {capability.points && capability.points.length > 0 && (
				<ul className="list-disc list-inside space-y-2">
				  {capability.points.map((point, i) => (
					<li key={i} className="text-gray-700">
					  {point}
					</li>
				  ))}
				</ul>
			  )}
			</div>
		  ))}
		</div>
	  </div>
	</div>
  );
};

Capabilities.propTypes = {
  capabilities: PropTypes.arrayOf(
	PropTypes.shape({
	  title: PropTypes.string.isRequired,
	  description: PropTypes.string.isRequired,
	  points: PropTypes.arrayOf(PropTypes.string), // Now points is an array of strings
	})
  ).isRequired,
};

export default Capabilities;
