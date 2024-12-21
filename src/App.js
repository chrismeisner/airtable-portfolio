// src/App.js

import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import SimpleHero from "./components/SimpleHero";
import Capabilities from "./components/Capabilities";
import CollapsibleTable from "./components/CollapsibleTable";
import About from "./components/About"; // Import the About component

const App = () => {
  const [tableProjects, setTableProjects] = useState([]);
  const [capabilitiesData, setCapabilitiesData] = useState([]); // New state for Capabilities
  const [error, setError] = useState(null);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCapabilities, setLoadingCapabilities] = useState(true); // New loading state
  const [wireframeMode, setWireframeMode] = useState(false);

  console.log("App component rendered");

  useEffect(() => {
    console.log("Fetching table projects from Airtable");
    const fetchTableProjects = async () => {
      try {
        const base = new Airtable({
          apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
        }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

        const projectsTable = process.env.REACT_APP_AIRTABLE_TABLE_NAME;

        const uniqueRecords = new Map();

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
                  if (
                    visibility.includes("Table") &&
                    !uniqueRecords.has(record.id)
                  ) {
                    const url = record.fields["URL"] || "#";
                    uniqueRecords.set(record.id, {
                      title: record.fields["Title"] || "Untitled",
                      url: isValidURL(url) ? url : "#",
                      urlTitle: record.fields["URL Title"] || url || "#",
                      description: record.fields["Description"] || "",
                      tags: record.fields["Tags"] || [],
                      images:
                        record.fields["Images"]?.map((image) => image.url) ||
                        [],
                      year: record.fields["Year"] || "N/A",
                    });
                  }
                });
                fetchNextPage();
              },
              (err) => {
                if (err) {
                  console.error("Airtable Projects error:", err);
                  console.log("Rejecting fetchProjects promise");
                  reject(err);
                } else {
                  console.log("Resolving fetchProjects promise");
                  resolve(Array.from(uniqueRecords.values()));
                }
              }
            );
        });

        const allTableProjects = await fetchProjects;

        console.log("Fetched table projects:", allTableProjects);

        setTableProjects(allTableProjects);
        setLoadingProjects(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
        setLoadingProjects(false);
      }
    };

    fetchTableProjects();
  }, []);

  useEffect(() => {
    console.log("Fetching capabilities from Airtable");
    const fetchCapabilities = async () => {
      try {
        const base = new Airtable({
          apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
        }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

        const capabilitiesTable = "Capabilities"; // Ensure this matches your Airtable table name

        const capabilitiesRecords = [];

        const fetchRecords = new Promise((resolve, reject) => {
          base(capabilitiesTable)
            .select({ view: "Grid view" })
            .eachPage(
              (records, fetchNextPage) => {
                records.forEach((record) => {
                  const name = record.fields["Name"] || "Untitled";
                  const summary = record.fields["Summary"] || "";
                  const pointsRaw = record.fields["Points"] || "";
                  const points = pointsRaw
                    .split("\n")
                    .map((point) => point.replace(/^- /, "").trim())
                    .filter((point) => point.length > 0);
                  capabilitiesRecords.push({
                    title: name,
                    description: summary,
                    points: points, // Add points array
                  });
                });
                fetchNextPage();
              },
              (err) => {
                if (err) {
                  console.error("Airtable Capabilities error:", err);
                  reject(err);
                } else {
                  resolve();
                }
              }
            );
        });

        await fetchRecords;

        console.log("Fetched capabilities:", capabilitiesRecords);

        setCapabilitiesData(capabilitiesRecords);
        setLoadingCapabilities(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
        setLoadingCapabilities(false);
      }
    };

    fetchCapabilities();
  }, []);

  if (error) {
    console.log("Rendering error state");
    return (
      <div className="bg-red-100 text-red-800 p-4">
        <p>Error fetching data: {error.message}</p>
      </div>
    );
  }

  const isLoading = loadingProjects || loadingCapabilities;

  return (
    <div
      className={`bg-app-bg min-h-screen ${
        wireframeMode ? "wireframe" : ""
      } py-6 sm:py-12 lg:py-4 px-4 sm:px-8 lg:px-4`}
    >
      {/* Wireframe Toggle Button */}
      <button
        onClick={() => {
          console.log(
            `Wireframe mode toggled to ${!wireframeMode ? "ON" : "OFF"}`
          );
          setWireframeMode(!wireframeMode);
        }}
        className="fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded shadow z-50"
      >
        Toggle Wireframe
      </button>

      {/* Consistent Container */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          console.log("Rendering loading state"),
          (
            <div className="flex justify-center items-center min-h-screen">
              <div
                className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"
                role="status"
                aria-label="loading"
              ></div>
            </div>
          )
        ) : (
          <div className="animate-fade-in space-y-12">
            {/* Hero Section */}
            <SimpleHero />

            {/* Capabilities Section */}
            <Capabilities capabilities={capabilitiesData} />

            {/* Projects Table Section */}
            <section className="mt-12">
              <CollapsibleTable data={tableProjects} />
            </section>

            {/* About Section */}
            <section className="mt-12">
              <About />
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
