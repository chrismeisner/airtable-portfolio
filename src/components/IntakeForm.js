import React, { useState, useMemo } from "react";

// Helper function to calculate the next four Mondays
const getNextFourMondays = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const daysUntilNextMonday = (8 - dayOfWeek) % 7; 
  const daysUntilNextNextMonday = daysUntilNextMonday + 7; 

  const startDate = new Date(today);
  startDate.setDate(today.getDate() + daysUntilNextNextMonday);

  const mondays = [];
  for (let i = 0; i < 4; i++) {
	const monday = new Date(startDate);
	monday.setDate(startDate.getDate() + i * 7);
	mondays.push(monday);
  }

  return mondays;
};

const IntakeForm = () => {
  const mondayOptions = useMemo(() => getNextFourMondays(), []);

  const [projectGoal, setProjectGoal] = useState("");
  const [startDate, setStartDate] = useState(mondayOptions[0]?.toISOString());
  const [velocity, setVelocity] = useState("Part-Time");
  const [months, setMonths] = useState(1);
  const [weeks, setWeeks] = useState(0);

  const {
	projectEstimate,
	totalWeeks,
	totalBillableDays,
	formattedStart,
	formattedEnd,
	dayRate,
  } = useMemo(() => {
	let weeklyRate = 0;
	let daysPerWeek = 0;

	if (velocity === "Consultant") {
	  weeklyRate = 1500; 
	  daysPerWeek = 1;
	} else if (velocity === "Part-Time") {
	  weeklyRate = 4000; 
	  daysPerWeek = 3;
	} else if (velocity === "Full-Time") {
	  weeklyRate = 6000;
	  daysPerWeek = 5;
	}

	const totalWeeks = months * 4 + weeks;
	const projectEstimate = weeklyRate * totalWeeks;

	const start = new Date(startDate);
	const end = new Date(start.getTime());
	end.setDate(end.getDate() + totalWeeks * 7);

	const totalBillableDays = totalWeeks * daysPerWeek;
	const dayRate = totalBillableDays > 0 ? projectEstimate / totalBillableDays : 0;

	const dateOptions = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
	const formattedStart = start.toLocaleDateString("en-US", dateOptions);
	const formattedEnd = end.toLocaleDateString("en-US", dateOptions);

	return {
	  projectEstimate,
	  totalWeeks,
	  totalBillableDays,
	  formattedStart,
	  formattedEnd,
	  dayRate,
	};
  }, [velocity, months, weeks, startDate]);

  const velocityOptions = [
	{ label: "Consultant", days: "1 day", hours: "5 hours" },
	{ label: "Part-Time", days: "3 days", hours: "15 hours" },
	{ label: "Full-Time", days: "5 days", hours: "30 hours" },
  ];

  return (
	<div className="mt-12 p-8 bg-white shadow-md rounded-lg max-w-lg mx-auto">
	  <h2 className="text-2xl font-semibold mb-6 text-gray-800">Project Intake Form</h2>
	  <form className="space-y-6">
		{/* Project Goal */}
		<div>
		  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="project-goal">
			Project Goal / Scope
		  </label>
		  <textarea
			id="project-goal"
			value={projectGoal}
			onChange={(e) => setProjectGoal(e.target.value)}
			className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
			placeholder="Describe the goal or scope of your project..."
		  />
		</div>

		{/* Start Date */}
		<div>
		  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="start-date">
			Start Date
		  </label>
		  <select
			id="start-date"
			value={startDate}
			onChange={(e) => setStartDate(e.target.value)}
			className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
		  >
			{mondayOptions.map((monday, index) => (
			  <option key={index} value={monday.toISOString()}>
				{monday.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
			  </option>
			))}
		  </select>
		</div>

		{/* Velocity (Horizontal Selectors) */}
		<div>
		  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="velocity">
			Velocity
		  </label>
		  <div id="velocity" className="flex space-x-4">
			{velocityOptions.map((option) => {
			  const isSelected = velocity === option.label;
			  return (
				<div
				  key={option.label}
				  onClick={() => setVelocity(option.label)}
				  className={`cursor-pointer flex flex-col items-center justify-center p-4 border rounded-md w-1/3 
					${isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white'}`}
				>
				  <span className="font-semibold text-gray-700">{option.label}</span>
				  <div className="text-sm text-gray-500 flex flex-col items-center mt-1">
					<span>{option.days}</span>
					<span>{option.hours}</span>
				  </div>
				</div>
			  );
			})}
		  </div>
		</div>

		{/* Duration - Months and Weeks */}
		<div>
		  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="months">
			Months
		  </label>
		  <input
			type="number"
			id="months"
			min="0"
			value={months}
			onChange={(e) => {
			  const val = parseInt(e.target.value, 10);
			  setMonths(isNaN(val) ? 0 : Math.max(0, val));
			}}
			className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
		  />

		  <label className="block text-sm font-medium text-gray-700 mt-4 mb-1" htmlFor="weeks">
			Weeks
		  </label>
		  <input
			type="number"
			id="weeks"
			min="0"
			max="3"
			value={weeks}
			onChange={(e) => {
			  const val = parseInt(e.target.value, 10);
			  setWeeks(isNaN(val) ? 0 : Math.min(3, Math.max(0, val)));
			}}
			className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
		  />
		  <p className="text-sm text-gray-500 mt-1">Maximum of 3 weeks.</p>
		</div>

		{/* Project Estimate and Additional Info */}
		<div className="mt-6">
		  <h3 className="text-lg font-medium text-gray-700">Project Details</h3>
		  <p className="mt-1 text-2xl font-semibold text-indigo-600">
			${projectEstimate.toLocaleString()} USD
		  </p>
		  <div className="mt-4 space-y-1 text-gray-700">
			<p><strong>Start Date:</strong> {formattedStart}</p>
			<p><strong>End Date:</strong> {formattedEnd}</p>
			<p><strong>Total Weeks:</strong> {totalWeeks}</p>
			<p><strong>Total Billable Days:</strong> {totalBillableDays}</p>
			<p><strong>Day Rate:</strong> ${dayRate.toLocaleString()} USD/day</p>
		  </div>
		</div>
	  </form>
	</div>
  );
};

export default IntakeForm;
