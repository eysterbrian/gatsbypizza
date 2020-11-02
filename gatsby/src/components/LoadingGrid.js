import React from 'react';
import { ItemsGridStyles, SingleItemStyles } from './Grids';

/**
 * Create a grid of empty cells including a spacer image and an animated
 * loading background.
 * @param {*} param0
 */
export default function LoadingGrid({ count = 4 }) {
  return (
    <ItemsGridStyles>
      {Array.from({ length: count }, (_, idx) => (
        <SingleItemStyles key={idx}>
          <p>
            <span className="mark">Loading...</span>
          </p>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            className="loading"
            alt="Loading"
            width="500"
            height="400"
          />
        </SingleItemStyles>
      ))}
    </ItemsGridStyles>
  );
}
