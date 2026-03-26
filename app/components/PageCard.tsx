import React from 'react';
import Link from 'next/link';

interface PageCardProps {
  path: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PageCard: React.FC<PageCardProps> = ({ path, title, description, icon }) => {
  return (
    <Link
      href={path}
      className="block text-left p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
    >
      <div className="text-indigo-500 dark:text-indigo-400 mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </Link>
  );
};

export default PageCard;
