import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#F6F5F2] text-gray-700 dark:bg-[#29292d]  transition transition-all delay-0.5 ">
      <div className="container mx-auto px-6">
        <div className="text-center  border-t border-gray-300 dark:text-white dark:border-gray-700">
          <p>&copy; {new Date().getFullYear()} News Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
