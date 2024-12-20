import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import "./styles/CollapsibleTable.css";

const CollapsibleTable = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState([]); 
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);

  // To store refs for each collapsible content row
  const contentRefs = useRef({});

  const toggleRow = (index) => {
	setExpandedRows((prev) => {
	  if (prev.includes(index)) {
		// Collapse by removing from array
		return prev.filter((rowIndex) => rowIndex !== index);
	  } else {
		// Expand by adding to array
		return [...prev, index];
	  }
	});
  };

  const showModal = (images, index) => {
	setModalImages(images);
	setModalIndex(index);
	setModalVisible(true);
  };

  const hideModal = () => {
	setModalVisible(false);
	setModalImages([]);
	setModalIndex(0);
  };

  const handleKeyDown = useCallback(
	(e) => {
	  if (modalVisible) {
		if (e.key === "ArrowLeft") {
		  setModalIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
		} else if (e.key === "ArrowRight") {
		  setModalIndex((prev) => (prev + 1) % modalImages.length);
		} else if (e.key === "Escape") {
		  hideModal();
		}
	  }
	},
	[modalVisible, modalImages.length]
  );

  useEffect(() => {
	document.addEventListener("keydown", handleKeyDown);
	return () => {
	  document.removeEventListener("keydown", handleKeyDown);
	};
  }, [handleKeyDown]);

  // Prevent scrolling when modal is open
  useEffect(() => {
	if (modalVisible) {
	  document.body.style.overflow = "hidden";
	} else {
	  document.body.style.overflow = "auto";
	}
  }, [modalVisible]);

  // After each render, update the maxHeight based on expansion state
  useEffect(() => {
	expandedRows.forEach((index) => {
	  if (contentRefs.current[index]) {
		const contentEl = contentRefs.current[index];
		const innerEl = contentEl.querySelector('.collapsible-inner');
		if (innerEl) {
		  contentEl.style.maxHeight = innerEl.scrollHeight + "px";
		}
	  }
	});

	// For collapsed rows, set maxHeight back to 0
	Object.keys(contentRefs.current).forEach((key) => {
	  const idx = parseInt(key, 10);
	  if (!expandedRows.includes(idx)) {
		const contentEl = contentRefs.current[idx];
		if (contentEl) {
		  contentEl.style.maxHeight = "0";
		}
	  }
	});
  }, [expandedRows]);

  const handleImageClick = (e, rowIndex, imgIndex) => {
	// Prevent the collapsible toggle from happening when clicking an image
	e.stopPropagation();
	showModal(data[rowIndex].images, imgIndex);
  };

  return (
	<div className="w-full max-w-screen-xl mx-auto p-4 bg-gray-800 text-gray-200 rounded-lg shadow-md mt-8 overflow-x-auto">
	  <table className="min-w-full divide-y divide-gray-700 table-auto">
		<thead className="bg-gray-700">
		  <tr>
			<th className="px-2 md:px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">
			  Year
			</th>
			<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap">Project</th>
			<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
			  Role
			</th>
			<th
			  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap hidden md:table-cell overview-column"
			  title="Overview"
			>
			  Overview
			</th>
			<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
			  Images
			</th>
		  </tr>
		</thead>
		<tbody className="bg-gray-800 divide-y divide-gray-700">
		  {data && data.length > 0 ? (
			data.map((row, index) => {
			  const isExpanded = expandedRows.includes(index);
			  const contentId = `collapsible-content-${index}`;

			  return (
				<React.Fragment key={index}>
				  <tr
					className="hover:bg-gray-700 cursor-pointer"
					onClick={() => toggleRow(index)}
				  >
					<td className="px-2 md:px-4 py-3 whitespace-nowrap text-center">
					  {row.year}
					</td>
					<td
					  className="px-4 py-3 whitespace-nowrap truncate"
					  title={row.title}
					>
					  {row.title}
					  {/* Mobile-only Role tags */}
					  <div className="md:hidden mt-2">
						{row.tags.map((tag, i) => (
						  <span
							key={i}
							className="inline-block bg-indigo-700 text-gray-100 text-xs px-2 py-1 rounded-full mr-1 mb-1"
						  >
							{tag}
						  </span>
						))}
					  </div>
					</td>
					<td className="px-4 py-3 whitespace-nowrap hidden md:table-cell">
					  <div className="flex flex-nowrap space-x-2">
						{row.tags.map((tag, i) => (
						  <span
							key={i}
							className="inline-block bg-indigo-700 text-gray-100 text-xs px-2 py-1 rounded-full"
						  >
							{tag}
						  </span>
						))}
					  </div>
					</td>
					<td
					  className="px-4 py-3 whitespace-nowrap truncate hidden md:table-cell overview-column"
					  title={row.description}
					>
					  {row.description}
					</td>
					<td
					  className="px-4 py-3 whitespace-nowrap hidden md:table-cell image-count"
					  data-target={contentId}
					>
					  {row.images.length}
					</td>
				  </tr>

				  <tr>
					<td colSpan="5" className="p-0">
					  <div
						id={contentId}
						ref={(el) => (contentRefs.current[index] = el)}
						className={`collapsible-content ${isExpanded ? "expanded" : ""}`}
						// Clicking anywhere inside the expanded section toggles (closes) it.
						onClick={() => toggleRow(index)}
					  >
						{/* Inner wrapper to measure content accurately */}
						<div className="collapsible-inner p-4 bg-gray-700 flex flex-col md:flex-row gap-4 text-gray-200">
						  <div className="detail md:w-1/3">
							<p className="text-gray-100">{row.description}</p>
						  </div>
						  <div className="images flex flex-wrap gap-4 md:w-2/3">
							{row.images.map((imgUrl, imgIndex) => (
							  <div
								key={imgIndex}
								className="w-20 h-20 rounded-md bg-center bg-cover cursor-pointer"
								style={{ backgroundImage: `url('${imgUrl}')` }}
								onClick={(e) => handleImageClick(e, index, imgIndex)}
								title={`Image ${imgIndex + 1}`}
							  ></div>
							))}
						  </div>
						</div>
					  </div>
					</td>
				  </tr>
				</React.Fragment>
			  );
			})
		  ) : (
			<tr>
			  <td colSpan="5" className="text-center p-4 text-gray-400">
				No data available
			  </td>
			</tr>
		  )}
		</tbody>
	  </table>

	  {/* Modal */}
	  <div
		id="modal"
		className={`fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center z-50 ${
		  modalVisible ? "modal-visible" : "modal-hidden"
		}`}
		onClick={hideModal}
	  >
		<div
		  id="modal-content"
		  className="w-96 h-96 bg-gray-700 rounded-md relative bg-center bg-cover"
		  style={{ backgroundImage: modalImages[modalIndex] ? `url('${modalImages[modalIndex]}')` : "none" }}
		  onClick={(e) => e.stopPropagation()}
		>
		  <button
			onClick={hideModal}
			className="absolute top-2 right-2 text-gray-200 bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center"
		  >
			✕
		  </button>
		</div>
	  </div>
	</div>
  );
};

CollapsibleTable.propTypes = {
  data: PropTypes.arrayOf(
	PropTypes.shape({
	  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	  title: PropTypes.string.isRequired,
	  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	  description: PropTypes.string.isRequired,
	  images: PropTypes.arrayOf(PropTypes.string).isRequired,
	  url: PropTypes.string,
	  urlTitle: PropTypes.string,
	})
  ).isRequired,
};

CollapsibleTable.defaultProps = {
  data: [],
};

export default CollapsibleTable;
