import React from 'react';

const PortfolioTextHero = ({
  title = "Effortlessly Create Recurring Group Sessions For Your Subscribers.",
  subtitle = "Session Subs integrates with Stripe and Zoom to automate subscriber access, session reminders, and invitations.",
  linkText = "Collaboration Intake Form",
  linkHref = "#",
  skills = [
	{
	  icon: "✏️",
	  title: "Design",
	  description: "Figma, Adobe Illustrator / Photoshop",
	  link: { text: "Figma Sample", href: "#" },
	},
	{
	  icon: "⚙️",
	  title: "Development",
	  description: "FE: JS / Tailwind / React, BE: Airtable / Heroku",
	  link: { text: "Github", href: "#" },
	},
	{
	  icon: "💬",
	  title: "Collaboration",
	  description: "Loom, Google Docs, Slack, Hangout/Zoom, Calendly",
	},
  ],
  pricing = [
	{
	  icon: "🗓️",
	  type: "Weekly Retainer",
	  hours: "1 day / 5 Hours",
	  price: "$1,500 / week",
	},
	{
	  icon: "⏳",
	  type: "Weekly Part-Time",
	  hours: "3 days / 15 Hours",
	  price: "$4,000 / week",
	},
	{
	  icon: "🕒",
	  type: "Weekly Full-Time",
	  hours: "5 days / 30 Hours",
	  price: "$6,000 / week",
	},
  ],
}) => {
  return (
	<div className="py-12 px-6 lg:px-16">
	  <div className="max-w-[1024px] mx-auto">
		<div>
		  <h1>{title}</h1>
		  <p className="mt-4 text-lg text-gray-700 sm:text-xl">
			{subtitle}{' '}
			<a href={linkHref} className="text-indigo-600 underline font-medium">
			  {linkText}
			</a>
		  </p>
		</div>

		<div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
		  {/* Skills */}
		  <div>
			<p className="text-gray-600 mb-6">
			  Skills include self-management, solving novel problems, and prototyping workflows.
			</p>
			<div className="space-y-6">
			  {skills.map((skill, index) => (
				<div key={index} className="flex w-full">
				  {/* Red Section */}
				  <div className="w-1/2 flex items-start space-x-4">
					<div className="text-xl">{skill.icon}</div>
					<div>
					  <h4 className="text-lg font-semibold text-gray-900">{skill.title}</h4>
					  {skill.link && (
						<a
						  href={skill.link.href}
						  className="text-indigo-600 font-medium underline mt-1"
						>
						  {skill.link.text}
						</a>
					  )}
					</div>
				  </div>
				  {/* Lime Section */}
				  <div className="w-1/2">
					<p className="text-gray-600">{skill.description}</p>
				  </div>
				</div>
			  ))}
			</div>
		  </div>

		  {/* Pricing */}
		  <div>
			<p className="text-gray-600 mb-6">
			  Access any and all of my skills, send daily updates, and track progress through a shared Google Doc.
			</p>
			<div className="space-y-6">
			  {pricing.map((price, index) => (
				<div key={index} className="flex w-full">
				  {/* Red Section */}
				  <div className="w-1/2 flex items-start space-x-4">
					<div className="text-xl">{price.icon}</div>
					<div>
					  <h4 className="text-lg font-semibold text-gray-900">{price.type}</h4>
					  <p className="text-gray-600">{price.hours}</p>
					</div>
				  </div>
				  {/* Lime Section */}
				  <div className="w-1/2">
					<p className="text-lg font-medium text-gray-900">{price.price}</p>
				  </div>
				</div>
			  ))}
			</div>
		  </div>
		</div>
	  </div>
	</div>
  );
};

export default PortfolioTextHero;
