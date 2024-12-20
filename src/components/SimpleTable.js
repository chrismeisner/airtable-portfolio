import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles/SimpleTable.css";

const SimpleTable = ({ data }) => {
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const toggleRowExpansion = (index) => {
	setExpandedRowIndex((prev) => (prev === index ? null : index)); // Toggle the expanded state
  };

  const handleMouseMove = (e, imageUrl) => {
	setHoveredImage(imageUrl);
	setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
	setHoveredImage(null);
  };

  return (
	<div className="overflow-x-auto">
	  <table className="table-dark">
		<thead>
		  <tr>
			<th>Year</th>
			<th>Title</th>
			<th>URL</th>
			<th>Description</th>
			<th>Images</th>
			<th>Tags</th>
		  </tr>
		</thead>
		<tbody>
		  {data && data.length > 0 ? (
			data.map((row, index) => {
			  const isExpanded = expandedRowIndex === index;

			  return (
				<React.Fragment key={index}>
				  <tr
					className={isExpanded ? "expanded-row" : ""}
					onClick={() => toggleRowExpansion(index)}
				  >
					<td>{row.year}</td>
					<td>{row.title}</td>
					<td>
					  <a
						href={row.url}
						target="_blank"
						rel="noopener noreferrer"
					  >
						{row.urlTitle}
					  </a>
					</td>
					<td
					  className={`description-cell ${
						isExpanded ? "expanded" : ""
					  }`}
					>
					  {row.description}
					</td>
					<td className="images-cell">
					  {row.images.map((image, idx) => (
						<img
						  key={idx}
						  src={image}
						  alt={`Preview ${idx + 1}`}
						  className="image-preview"
						  onMouseMove={(e) => handleMouseMove(e, image)} // Hover logic
						  onMouseLeave={handleMouseLeave} // Reset hover state
						/>
					  ))}
					</td>
					<td>{row.tags.join(", ")}</td>
				  </tr>

				  {/* Expanded content row */}
				  {isExpanded && (
					<tr className="expanded-content-row">
					  <td colSpan="6" className="selected-image-container">
						{row.images.length > 0 ? (
						  <div className="expanded-images-row">
							{row.images.map((image, idx) => (
							  <img
								key={idx}
								src={image}
								alt={`Expanded Preview ${idx + 1}`}
								className="expanded-image"
							  />
							))}
						  </div>
						) : (
						  <div className="selected-image-placeholder">
							No images available for this row.
						  </div>
						)}
					  </td>
					</tr>
				  )}
				</React.Fragment>
			  );
			})
		  ) : (
			<tr>
			  <td colSpan="6" className="placeholder">
				No data available
			  </td>
			</tr>
		  )}
		</tbody>
	  </table>

	  {/* Large Image Hover Preview */}
	  {hoveredImage && (
		<div
		  className="large-image-preview"
		  style={{
			top: cursorPosition.y - 200, // Adjust position for better visibility
			left: cursorPosition.x + 20, // Offset to the right of the cursor
		  }}
		>
		  <img src={hoveredImage} alt="Large Preview" />
		</div>
	  )}
	</div>
  );
};

SimpleTable.propTypes = {
  data: PropTypes.arrayOf(
	PropTypes.shape({
	  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	  title: PropTypes.string.isRequired,
	  url: PropTypes.string.isRequired,
	  urlTitle: PropTypes.string.isRequired,
	  description: PropTypes.string.isRequired,
	  images: PropTypes.arrayOf(PropTypes.string).isRequired,
	  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	})
  ).isRequired,
};

SimpleTable.defaultProps = {
  data: [],
};

export default SimpleTable;
