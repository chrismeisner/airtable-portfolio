import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ links }) => {
  return (
	<header className="bg-white shadow-md">
	  <div className="container mx-auto px-6 py-4 flex justify-between items-center">
		{/* Logo */}
		<Link to="/" className="text-2xl font-bold text-gray-800">
		  Boilerplate App
		</Link>
		{/* Navigation Links */}
		<nav className="space-x-4">
		  {links.map(({ label, href }, index) => (
			<Link
			  key={index}
			  to={href}
			  className="text-lg font-semibold text-gray-800 hover:text-gray-600"
			>
			  {label}
			</Link>
		  ))}
		</nav>
	  </div>
	</header>
  );
};

export default Header;
