import React from 'react';

export default function Footer() {
  return (
    <footer>
      {/* .center class comes from global Typography styled component */}
      <p className="center">&copy; Slick's Slices {new Date().getFullYear()}</p>
    </footer>
  );
}
