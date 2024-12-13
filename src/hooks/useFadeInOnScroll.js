import { useEffect } from 'react';

export const useFadeInOnScroll = () => {
  useEffect(() => {
	const observer = new IntersectionObserver(
	  (entries) => {
		entries.forEach((entry) => {
		  if (entry.isIntersecting) {
			entry.target.classList.add('animate-fade-in');
			observer.unobserve(entry.target);
		  }
		});
	  },
	  { threshold: 0.1 }
	);

	const elements = document.querySelectorAll('.fade-on-scroll');
	elements.forEach((el) => observer.observe(el));
  }, []);
};
