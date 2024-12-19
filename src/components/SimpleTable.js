import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles/SimpleTable.css"; // Import the dark mode styles

const SimpleTable = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [hoveredImage, setHoveredImage] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const toggleRowExpansion = (index) => {
	setExpandedRows((prev) => ({
	  ...prev,
	  [index]: !prev[index],
	}));
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
			<th>Title</th>
			<th>URL</th>
			<th>Year</th>
			<th>Description</th>
			<th>Images</th>
			<th>Tags</th>
		  </tr>
		</thead>
		<tbody>
		  {data && data.length > 0 ? (
			data.map((row, index) => (
			  <tr key={index}>
				<td>{row.title}</td>
				<td>
				  <a href={row.url} target="_blank" rel="noopener noreferrer">
					{row.urlTitle}
				  </a>
				</td>
				<td>{row.year}</td>
				<td
				  className={`description-cell ${
					expandedRows[index] ? "expanded" : ""
				  }`}
				  onClick={() => toggleRowExpansion(index)}
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
					  onMouseMove={(e) => handleMouseMove(e, image)}
					  onMouseLeave={handleMouseLeave}
					/>
				  ))}
				</td>
				<td>{row.tags.join(", ")}</td>
			  </tr>
			))
		  ) : (
			<tr>
			  <td colSpan="6" className="placeholder">
				No data available
			  </td>
			</tr>
		  )}
		</tbody>
	  </table>

	  {/* Large Image Preview */}
	  {hoveredImage && (
		<div
		  className="large-image-preview"
		  style={{
			top: cursorPosition.y + 20, // Offset the image slightly below the cursor
			left: cursorPosition.x + 20,
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
	  title: PropTypes.string.isRequired,
	  url: PropTypes.string.isRequired,
	  urlTitle: PropTypes.string.isRequired,
	  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	  description: PropTypes.string.isRequired,
	  images: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of image URLs
	  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	})
  ).isRequired,
};

export default SimpleTable;
