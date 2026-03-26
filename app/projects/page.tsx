import React from 'react';
import PageCard from '../components/PageCard';

export default function ProjectsPage() {
  const projects = [
    {
      path: '/projects/foodi',
      title: 'FOODI',
      description:
        'A research project improving controlled-environment agriculture through automation and digital-twin modeling.',
      icon: (
        <img
          src="/images/FOODI_ICON.png"
          alt="FOODI Logo"
          className="h-12 w-12 rounded-full object-cover"
        />
      ),
    },
    {
      path: '/projects/sose',
      title: 'SOSE',
      description:
        'A high-performance, distributed backend engine for powering real-time social media applications and analytics.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white text-center">
        My Projects
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-center">
        Here&apos;s a selection of my work. Click on a card to learn more about each project.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {projects.map((project, index) => (
          <PageCard
            key={index}
            path={project.path}
            title={project.title}
            description={project.description}
            icon={project.icon}
          />
        ))}
      </div>
    </div>
  );
}
