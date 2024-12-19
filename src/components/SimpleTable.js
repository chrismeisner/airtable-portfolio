// src/components/SimpleTable.js

import React from "react";
import PropTypes from "prop-types";

const SimpleTable = ({ data }) => {
  return (
	<div className="overflow-x-auto">
	  <table className="min-w-full bg-white border border-gray-200">
		<thead>
		  <tr className="bg-gray-100">
			<th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border">Title</th>
			<th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border">URL</th>
			<th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border">Year</th> {/* New Header */}
			<th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border">Description</th>
			<th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border">Tags</th>
		  </tr>
		</thead>
		<tbody>
		  {data && data.length > 0 ? (
			data.map((row, index) => (
			  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
				<td className="px-4 py-2 border text-sm text-gray-700">{row.title}</td>
				<td className="px-4 py-2 border text-sm text-gray-700">
				  <a href={row.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
					{row.urlTitle}
				  </a>
				</td>
				<td className="px-4 py-2 border text-sm text-gray-700">{row.year}</td> {/* Display Year */}
				<td className="px-4 py-2 border text-sm text-gray-700">{row.description}</td>
				<td className="px-4 py-2 border text-sm text-gray-700">{row.tags.join(', ')}</td>
			  </tr>
			))
		  ) : (
			<tr>
			  <td
				colSpan="5" // Updated colspan to 5
				className="px-4 py-2 text-center text-sm text-gray-500 border"
			  >
				No data available
			  </td>
			</tr>
		  )}
		</tbody>
	  </table>
	</div>
  );
};

SimpleTable.propTypes = {
  data: PropTypes.arrayOf(
	PropTypes.shape({
	  title: PropTypes.string.isRequired,
	  url: PropTypes.string.isRequired,
	  urlTitle: PropTypes.string.isRequired,
	  year: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	  ]).isRequired,
	  description: PropTypes.string.isRequired,
	  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	})
  ).isRequired,
};

export default SimpleTable;
