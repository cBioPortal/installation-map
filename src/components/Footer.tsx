
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 text-center">
      <div className="container mx-auto px-4">
        <p>
          © {new Date().getFullYear()} cBioPortal. 
          <a 
            href="https://www.cbioportal.org" 
            className="ml-2 text-cbioportal-blue hover:underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Visit cBioPortal.org
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
