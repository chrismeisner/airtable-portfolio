import React from 'react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

const TypographyGuide = () => {
  // Activate fade-in animations on scroll
  useFadeInOnScroll();

  return (
	<div className="bg-gray-50 text-gray-900 font-sans p-8 min-h-screen">
	  <header className="mb-12 fade-on-scroll opacity-0">
		<h1 className="text-4xl font-bold text-center">Typography Style Guide</h1>
		<p className="text-lg text-center text-gray-600">Showcasing common Tailwind font styles</p>
	  </header>

	  <main className="space-y-12">
		{/* Headings */}
		<section className="fade-on-scroll opacity-0">
		  <h2 className="text-2xl font-semibold border-b pb-2">Headings</h2>
		  <div className="space-y-4">
			<h1 className="text-5xl font-extrabold">Heading 1 (h1)</h1>
			<h2 className="text-4xl font-bold">Heading 2 (h2)</h2>
			<h3 className="text-3xl font-semibold">Heading 3 (h3)</h3>
			<h4 className="text-2xl font-medium">Heading 4 (h4)</h4>
			<h5 className="text-xl font-medium">Heading 5 (h5)</h5>
			<h6 className="text-lg font-normal">Heading 6 (h6)</h6>
		  </div>
		</section>

		{/* Paragraphs */}
		<section className="fade-on-scroll opacity-0">
		  <h2 className="text-2xl font-semibold border-b pb-2">Paragraphs</h2>
		  <div className="space-y-4">
			<p className="text-base">This is a standard paragraph using <code>text-base</code>.</p>
			<p className="text-sm">This is a smaller paragraph using <code>text-sm</code>.</p>
			<p className="text-lg">This is a larger paragraph using <code>text-lg</code>.</p>
			<p className="text-gray-500">This is a muted paragraph using <code>text-gray-500</code>.</p>
		  </div>
		</section>

		{/* Links */}
		<section className="fade-on-scroll opacity-0">
		  <h2 className="text-2xl font-semibold border-b pb-2">Links</h2>
		  <div className="space-y-4">
			<a href="#" className="text-blue-500 hover:underline">Default link</a><br />
			<a href="#" className="text-blue-700 hover:text-blue-900">Darker link</a><br />
			<a href="#" className="text-indigo-500 underline hover:no-underline">Styled link</a>
		  </div>
		</section>

		{/* Inline Text Styles */}
		<section className="fade-on-scroll opacity-0">
		  <h2 className="text-2xl font-semibold border-b pb-2">Inline Text Styles</h2>
		  <p className="text-base">
			<strong className="font-bold">Bold text</strong>, 
			<em className="italic">italicized text</em>, 
			<span className="underline">underlined text</span>, 
			and <span className="line-through">strikethrough text</span>.
		  </p>
		</section>

		{/* Font Families */}
		<section className="fade-on-scroll opacity-0">
		  <h2 className="text-2xl font-semibold border-b pb-2">Font Families</h2>
		  <div className="space-y-4">
			<p className="font-sans">This text uses the <code>font-sans</code> class.</p>
			<p className="font-serif">This text uses the <code>font-serif</code> class.</p>
			<p className="font-mono">This text uses the <code>font-mono</code> class.</p>
		  </div>
		</section>
	  </main>

	  <footer className="mt-12 text-center text-gray-500 fade-on-scroll opacity-0">
		<p>Tailwind Typography Style Guide - Customize as needed!</p>
	  </footer>
	</div>
  );
};

export default TypographyGuide;
