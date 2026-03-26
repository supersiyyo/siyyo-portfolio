import React from 'react';
import Link from 'next/link';

export default function SosePage() {
  const techUsed = ['Go', 'gRPC', 'Kafka', 'Kubernetes', 'PostgreSQL', 'Redis', 'Prometheus'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 animate-fade-in container mx-auto my-8 max-w-4xl">
      <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
        <div className="bg-indigo-500 text-white rounded-full p-4 mr-0 md:mr-6 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">SOSE</h1>
          <p className="text-lg text-indigo-700 dark:text-indigo-300">
            Scalable Online Services Engine
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            Project Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            SOSE is a foundational backend framework designed for building robust, real-time, and
            scalable social applications. It provides a suite of tools for handling massive concurrent
            user loads, complex data streams, and distributed services, enabling developers to focus
            on feature implementation rather than infrastructure.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Key Features
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
            <li>Real-time event-driven architecture for low-latency communication.</li>
            <li>Horizontally scalable microservices for handling dynamic loads.</li>
            <li>Integrated data pipelines for sentiment analysis and trend detection.</li>
            <li>GraphQL and WebSocket APIs for flexible client-side integration.</li>
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
            <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center mb-4">
              <p className="text-gray-500 dark:text-gray-400">Architecture Diagram</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The microservice architecture of SOSE, highlighting the data flow from client requests
              through API gateways, service discovery, and data persistence layers.
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
