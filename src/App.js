import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import PortfolioTextHero from './components/PortfolioTextHero';
import PortfolioProjectPreview from './components/PortfolioProjectPreview';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
          process.env.REACT_APP_AIRTABLE_BASE_ID
        );

        const tableName = process.env.REACT_APP_AIRTABLE_TABLE_NAME;

        const uniqueRecords = new Map();

        base(tableName)
          .select({ view: 'Grid view' })
          .eachPage(
            (records, fetchNextPage) => {
              records.forEach((record) => {
                if (record.fields['Visibility'] === 'Show' && !uniqueRecords.has(record.id)) {
                  uniqueRecords.set(record.id, {
                    title: record.fields['Title'] || 'Untitled',
                    url: record.fields['URL'] || '#',
                    description: record.fields['Description'] || '',
                    tags: record.fields['Tags'] || [],
                    images: record.fields['Images']?.map((image) => image.url) || [],
                  });
                }
              });

              setProjects(Array.from(uniqueRecords.values()));
              fetchNextPage();
            },
            (err) => {
              if (err) {
                console.error('Airtable error:', err);
                setError(err);
              }
              setLoading(false);
            }
          );
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return (
      <div className="bg-red-100 text-red-800 p-4">
        <p>Error fetching projects: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={`bg-app-bg min-h-screen ${wireframeMode ? 'wireframe' : ''} py-6 sm:py-12 lg:py-4 px-4 sm:px-8 lg:px-4`}>
      <button
        onClick={() => setWireframeMode(!wireframeMode)}
        className="fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded shadow z-50"
      >
        Toggle Wireframe
      </button>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="animate-fade-in">
          {/* Hero Section */}
          <PortfolioTextHero
            title="Welcome to My Portfolio"
            subtitle="Here you'll find a collection of my latest projects and collaborations."
            linkText="Contact Me"
            linkHref="/contact"
            skills={[
              {
                icon: "✏️",
                title: "Design",
                description: "Figma, Adobe Illustrator, Photoshop",
                link: { text: "View Portfolio", href: "#" },
              },
              {
                icon: "⚙️",
                title: "Development",
                description: "React, Tailwind CSS, Node.js",
                link: { text: "GitHub", href: "#" },
              },
              {
                icon: "💬",
                title: "Collaboration",
                description: "Slack, Zoom, Calendly",
              },
            ]}
            pricing={[
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
            ]}
          />

          {/* Portfolio Projects */}
          {projects.map((project, index) => (
            <PortfolioProjectPreview
              key={index}
              title={project.title}
              url={project.url}
              description={project.description}
              tags={project.tags}
              images={project.images}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
