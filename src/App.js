// src/App.js

import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import SimpleHero from "./components/SimpleHero";
import Capabilities from "./components/Capabilities";
import PortfolioProjectPreview from "./components/PortfolioProjectPreview";
import SimpleTable from "./components/SimpleTable";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import About from "./components/About";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [tableProjects, setTableProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);

  useEffect(() => {
    const fetchProjectsAndTestimonials = async () => {
      try {
        const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
          process.env.REACT_APP_AIRTABLE_BASE_ID
        );

        const projectsTable = process.env.REACT_APP_AIRTABLE_TABLE_NAME;
        const testimonialsTable = "Testimonials";

        const uniqueRecords = new Map();
        const uniqueTestimonials = new Map();

        const isValidURL = (string) => {
          try {
            new URL(string);
            return true;
          } catch (_) {
            return false;
          }
        };

        const fetchProjects = new Promise((resolve, reject) => {
          base(projectsTable)
            .select({ view: "Grid view" })
            .eachPage(
              (records, fetchNextPage) => {
                records.forEach((record) => {
                  const visibility = record.fields["Visibility"] || [];
                  if (visibility.length > 0 && !uniqueRecords.has(record.id)) {
                    const url = record.fields["URL"] || "#";
                    uniqueRecords.set(record.id, {
                      title: record.fields["Title"] || "Untitled",
                      url: isValidURL(url) ? url : "#",
                      urlTitle: record.fields["URL Title"] || url || "#",
                      description: record.fields["Description"] || "",
                      tags: record.fields["Tags"] || [],
                      images: record.fields["Images"]?.map((image) => image.url) || [],
                      visibility: visibility,
                      year: record.fields["Year"] || "N/A",
                    });
                  }
                });
                fetchNextPage();
              },
              (err) => {
                if (err) {
                  console.error("Airtable Projects error:", err);
                  reject(err);
                } else {
                  resolve(Array.from(uniqueRecords.values()));
                }
              }
            );
        });

        const fetchTestimonials = new Promise((resolve, reject) => {
          base(testimonialsTable)
            .select({ view: "Grid view" })
            .eachPage(
              (records, fetchNextPage) => {
                records.forEach((record) => {
                  const visibility = record.fields["Visibility"];
                  if (visibility === "Yes" && !uniqueTestimonials.has(record.id)) {
                    uniqueTestimonials.set(record.id, {
                      quote: record.fields["Quote"] || "",
                      name: record.fields["Name"] || "Anonymous",
                      title: record.fields["Title"] || "",
                      image:
                        record.fields["Image"]?.[0]?.url ||
                        "https://via.placeholder.com/50",
                    });
                  }
                });
                fetchNextPage();
              },
              (err) => {
                if (err) {
                  console.error("Airtable Testimonials error:", err);
                  reject(err);
                } else {
                  resolve(Array.from(uniqueTestimonials.values()));
                }
              }
            );
        });

        const [allProjects, allTestimonials] = await Promise.all([fetchProjects, fetchTestimonials]);

        setProjects(allProjects);

        const featured = allProjects.filter((project) =>
          project.visibility.includes("Featured")
        );
        const table = allProjects.filter((project) =>
          project.visibility.includes("Table")
        );

        setFeaturedProjects(featured);
        setTableProjects(table);

        setTestimonials(allTestimonials);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchProjectsAndTestimonials();
  }, []);

  if (error) {
    return (
      <div className="bg-red-100 text-red-800 p-4">
        <p>Error fetching projects: {error.message}</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-app-bg min-h-screen ${
        wireframeMode ? "wireframe" : ""
      } py-6 sm:py-12 lg:py-4 px-4 sm:px-8 lg:px-4`}
    >
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
          <SimpleHero />

          {/* Capabilities Section */}
          <Capabilities />

          {/* Portfolio Projects Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Portfolio Projects</h2>
            {featuredProjects.map((project, index) => (
              <PortfolioProjectPreview
                key={index}
                title={project.title}
                url={project.url}
                urlTitle={project.urlTitle}
                description={project.description}
                tags={project.tags}
                images={project.images}
                year={project.year}
              />
            ))}
          </section>

          {/* Process Section */}
          <Process />

          {/* Testimonials Section */}
          <Testimonials testimonials={testimonials} />

          {/* About Section */}
          <About />

          {/* Projects Table Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Projects Table</h2>
            <SimpleTable data={tableProjects} />
          </section>
        </div>
      )}
    </div>
  );
};

export default App;
