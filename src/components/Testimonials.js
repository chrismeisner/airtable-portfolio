// src/components/Testimonials.js

import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // Updated import path
import "./styles/SwiperStyles.css"; // Import the separate Swiper CSS

const Testimonials = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
	return null; // Optionally, render a message indicating no testimonials are available
  }

  return (
	<div className="py-12 bg-app-bg w-full">
	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 className="text-center text-xl font-semibold mb-8">TESTIMONIALS</h2>
		<Swiper
		  modules={[Autoplay, Pagination, Navigation]}
		  spaceBetween={30}
		  slidesPerView={1}
		  loop={true}
		  autoplay={{
			delay: 3000,
			disableOnInteraction: false,
		  }}
		  pagination={{ clickable: true }}
		  navigation
		  breakpoints={{
			640: {
			  slidesPerView: 1,
			},
			768: {
			  slidesPerView: 2,
			},
			1024: {
			  slidesPerView: 3,
			},
		  }}
		  className="mySwiper"
		>
		  {testimonials.map((testimonial, index) => (
			<SwiperSlide key={index}>
			  <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-visible">
				<p className="text-gray-800 italic mb-6 flex-grow">
				  "{testimonial.quote}"
				</p>
				<div className="flex items-center mt-auto">
				  <img
					src={testimonial.image}
					alt={testimonial.name}
					loading="lazy"
					className="w-12 h-12 rounded-full mr-4"
					onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }} // Fallback image
				  />
				  <div>
					<p className="font-semibold text-gray-900">{testimonial.name}</p>
					<p className="text-gray-600 text-sm">{testimonial.title}</p>
				  </div>
				</div>
			  </div>
			</SwiperSlide>
		  ))}
		</Swiper>
	  </div>
	</div>
  );
};

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
	PropTypes.shape({
	  quote: PropTypes.string.isRequired,
	  name: PropTypes.string.isRequired,
	  title: PropTypes.string.isRequired,
	  image: PropTypes.string.isRequired,
	})
  ).isRequired,
};

export default Testimonials;
