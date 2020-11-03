import { Link } from 'gatsby';
import React from 'react';
import { ItemsGridStyles, SingleItemStyles } from './Grids';

/**
 * Creates a grid of images and names for the main homepage
 *
 * baseUrl prop indicates that these items can have links using
 * the item slugs
 */
export default function ItemGrid({ items, baseUrl }) {
  console.log(items, baseUrl);
  // We can't use Gatsby's image plugin/component, so we'll rely on
  // Sanity's image API to return an image cropped to exact dimensions
  return (
    <ItemsGridStyles>
      {items.map((item) => {
        // Generate the gridItem without any surrounding links
        let gridItem = (
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
        );

        // If this is a linkable item, then wrap it in a link
        if (baseUrl && item?.slug?.current) {
          gridItem = (
            <Link to={`${baseUrl}${item.slug.current}`}>{gridItem}</Link>
          );
        }
        return gridItem;
      })}
    </ItemsGridStyles>
  );
}
