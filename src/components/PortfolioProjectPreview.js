import React, { useState, useEffect, useRef } from 'react';

const PortfolioProjectPreview = ({ title, url, description, tags, images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const timerRef = useRef(null);

  // Prefetch all images
  useEffect(() => {
	const loadImages = async () => {
	  const promises = images.map((src) => {
		return new Promise((resolve, reject) => {
		  const img = new Image();
		  img.src = src;
		  img.onload = resolve;
		  img.onerror = reject;
		});
	  });

	  try {
		await Promise.all(promises);
		setImagesLoaded(true); // Mark images as fully loaded
	  } catch (err) {
		console.error("Error loading images:", err);
	  }
	};

	loadImages();
  }, [images]);

  const startTimer = () => {
	timerRef.current = setInterval(() => {
	  setCurrentSlide((prev) => (prev + 1) % images.length);
	}, 5000);
  };

  const stopTimer = () => {
	clearInterval(timerRef.current);
  };

  const handleImageClick = () => {
	setCurrentSlide((prev) => (prev + 1) % images.length);
	stopTimer();
	startTimer();
  };

  useEffect(() => {
	if (imagesLoaded) {
	  startTimer();
	}
	return () => stopTimer();
  }, [imagesLoaded]);

  if (!imagesLoaded) {
	return (
	  <div className="flex justify-center items-center h-full">
		<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
	  </div>
	);
  }

  return (
	<div className="py-8 px-4 sm:px-6 lg:py-16 lg:px-20 animate-fade-in">
	  <div className="max-w-[1024px] mx-auto flex flex-col-reverse lg:grid lg:grid-cols-[33%_67%] gap-8 items-start">
		{/* Text Content */}
		<div className="w-full lg:w-auto">
		  <h2>{title}</h2>
		  <a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="text-indigo-600 underline font-medium mt-2 block"
		  >
			{url}
		  </a>
		  <p className="mt-4 text-lg text-gray-700">{description}</p>
		  <div className="mt-6 flex space-x-2">
			{tags.map((tag, index) => (
			  <span key={index} className="tag-style">
				{tag}
			  </span>
			))}
		  </div>
		</div>

		{/* Sliding Image Carousel */}
		<div className="w-full">
		  <div
			className="aspect-[4/3] overflow-hidden relative bg-gray-100 cursor-pointer"
			onClick={handleImageClick}
		  >
			{images.map((image, index) => (
			  <img
				key={index}
				src={image}
				alt=""
				className={`w-full h-full object-contain absolute top-0 left-0 transition-opacity duration-[2000ms] ${
				  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
				}`}
			  />
			))}
		  </div>
		  <div className="flex justify-center mt-4 space-x-2">
			{images.map((_, index) => (
			  <button
				key={index}
				className={`w-2 h-2 rounded-full ${
				  index === currentSlide ? 'bg-gray-700' : 'bg-gray-300'
				}`}
				onClick={() => {
				  setCurrentSlide(index);
				  stopTimer();
				  startTimer();
				}}
			  ></button>
			))}
		  </div>
		</div>
	  </div>
	</div>
  );
};

export default PortfolioProjectPreview;
