// File: /src/components/About.js

import React from "react";

const About = () => {
  return (
	<div className="flex flex-col md:flex-row items-center bg-black text-white p-8 md:p-16">
	  <div className="md:w-1/2">
		<h2 className="text-3xl md:text-4xl font-bold mb-6">A real human being</h2>
		<p className="text-lg md:text-xl leading-relaxed mb-6">
		  Hi, I’m Chris Meisner, a product designer and design engineer working
		  with founders since 2010. With over 15 years of professional
		  experience, I specialize in interface design, rapid prototyping, and
		  agile, week-by-week development.
		</p>
		<div className="flex space-x-4">
		  <a
			href="#"
			className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500 transition"
		  >
			LinkedIn
		  </a>
		  <a
			href="#"
			className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200 transition"
		  >
			Twitter
		  </a>
		</div>
	  </div>

	  <div className="md:w-1/2 mt-8 md:mt-0 md:pl-12">
		<img
		  src="https://pbs.twimg.com/profile_images/1770909476666957824/4jxKqBYt_400x400.jpg"
		  alt="Chris Meisner"
		  className="rounded-lg shadow-lg max-w-full"
		/>
	  </div>
	</div>
  );
};

export default About;
