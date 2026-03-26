import React from 'react';
import Link from 'next/link';

export default function FoodiPage() {
  const techUsed = [
    'IoT Sensing',
    'Data Logging/ETL',
    'Automation/Control Loops',
    'Digital-Twin Modeling',
    'Data Analysis',
    'Raspberry Pi',
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 animate-fade-in container mx-auto my-8 max-w-4xl">
      <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
        <div className="flex-shrink-0 mr-0 md:mr-6 mb-4 md:mb-0">
          <img
            src="/images/FOODI_ICON.png"
            alt="FOODI Project Logo"
            className="h-16 w-16 rounded-full shadow-md object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            FOODI (ARCS)
          </h1>
          <p className="text-lg text-indigo-700 dark:text-indigo-300">
            Project Lead / Lead Researcher
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            Project Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            As the lead for the FOODI project at ARCS, I drove the technical direction to reduce
            real-world failure points in controlled-environment agriculture. My work focused on
            turning research goals into working systems by designing and implementing an end-to-end
            automation stack—from hardware integration and sensor engineering to building a
            cloud-based data pipeline ready for digital-twin modeling.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Key Contributions
          </h3>
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 mb-6">
            <li>
              Designed and implemented the core CEA automation stack on a Raspberry Pi platform,
              integrating sensors, relays, pumps, and cameras.
            </li>
            <li>
              Engineered solutions for real-world hardware challenges, including sensor electrolysis
              and drift, while developing robust control systems for irrigation and environmental
              management.
            </li>
            <li>
              Established a cloud-native data pipeline and imaging workflow, creating a &quot;master
              dataset&quot; to enable remote monitoring, analysis, and future computer vision
              applications.
            </li>
            <li>
              Developed backend API patterns and planned a secure, authenticated dashboard for
              stakeholder access and system management.
            </li>
            <li>
              Led research and prototyping efforts to create dependable, data-driven systems that
              advance the reliability and scalability of indoor agriculture.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {techUsed.map((tech) => (
              <span
                key={tech}
                className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-indigo-900 dark:text-indigo-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 h-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Project Snapshot
            </h3>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center mb-4 overflow-hidden aspect-square">
              <img
                src="/images/FOODI_ICON.png"
                alt="FOODI Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The official logo for the FOODI project, representing the intersection of agriculture
              and technology.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/projects"
          className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
