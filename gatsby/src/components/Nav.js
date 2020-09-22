import React from 'react';
import { Link, navigate } from 'gatsby';

function goToSlicers() {
  console.log('Going to slicers!');
}

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/beers">Beers</Link>
        </li>
        <li>
          <button
            type="button"
            onClick={() => window.setTimeout(() => navigate('/pizzas'), 2000)}
          >
            Click me to visit pizzas page
          </button>
        </li>
      </ul>
    </nav>
  );
}
