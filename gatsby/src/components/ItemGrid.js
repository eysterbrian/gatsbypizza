import React from 'react';
import { ItemsGridStyles, SingleItemStyles } from './Grids';

export default function ItemGrid({ items }) {
  // We can't use Gatsby's image plugin/component, so we'll rely on
  // Sanity's image API to return an image cropped to exact dimensions
  return (
    <ItemsGridStyles>
      {items.map((item) => (
        <SingleItemStyles key={item._id}>
          <p>
            <span className="mark">{item.name}</span>
          </p>
          <img
            width="500"
            height="400"
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
            alt={item.name}
            style={{
              background: `url(${item.image.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          />
        </SingleItemStyles>
      ))}
    </ItemsGridStyles>
  );
}
