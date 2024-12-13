import React from 'react';

const HeroSection = ({
  title = "Deploy to the cloud with confidence",
  subtitle = "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.",
  ctaPrimary = { text: "Get started", href: "#" },
  ctaSecondary = { text: "Learn more", href: "#" },
  badge = { text: "What's new", linkText: "Just shipped v1.0", href: "#" },
  logoSrc = "https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600",
  screenshotSrc = "https://tailwindui.com/plus/img/component-images/project-app-screenshot.png",
}) => {
  return (
	<div className="relative isolate overflow-hidden bg-white">
	  {/* Background SVG Pattern */}
	  <svg
		className="absolute inset-0 -z-10 w-full h-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
		aria-hidden="true"
	  >
		<defs>
		  <pattern
			id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
			width="200"
			height="200"
			x="50%"
			y="-1"
			patternUnits="userSpaceOnUse"
		  >
			<path d="M.5 200V.5H200" fill="none" />
		  </pattern>
		</defs>
		<rect
		  width="100%"
		  height="100%"
		  strokeWidth="0"
		  fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
		/>
	  </svg>

	  {/* Hero Content */}
	  <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
		{/* Text Section */}
		<div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8">
		  <img className="h-11" src={logoSrc} alt="Your Company" />
		  <div className="mt-24 sm:mt-32 lg:mt-16">
			<a href={badge.href} className="inline-flex space-x-6">
			  <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
				{badge.text}
			  </span>
			  <span className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600">
				<span>{badge.linkText}</span>
				<svg
				  className="h-5 w-5 text-gray-400"
				  viewBox="0 0 20 20"
				  fill="currentColor"
				  aria-hidden="true"
				>
				  <path
					fillRule="evenodd"
					d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
					clipRule="evenodd"
				  />
				</svg>
			  </span>
			</a>
		  </div>
		  <h1 className="mt-10 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
			{title}
		  </h1>
		  <p className="mt-8 text-lg text-gray-500 sm:text-xl">{subtitle}</p>
		  <div className="mt-10 flex items-center gap-x-6">
			<a
			  href={ctaPrimary.href}
			  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
			  {ctaPrimary.text}
			</a>
			<a
			  href={ctaSecondary.href}
			  className="text-sm font-semibold text-gray-900"
			>
			  {ctaSecondary.text} <span aria-hidden="true">→</span>
			</a>
		  </div>
		</div>

		{/* Image Section */}
		<div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
		  <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
			<div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
			  <img
				src={screenshotSrc}
				alt="App screenshot"
				className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
			  />
			</div>
		  </div>
		</div>
	  </div>
	</div>
  );
};

export default HeroSection;