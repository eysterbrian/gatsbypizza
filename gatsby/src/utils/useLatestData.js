import { useEffect, useState } from 'react';

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemasters] = useState();

  useEffect(() => {
    // Fetch the data when the component loads
    // TODO: Fetch all the relevant data here - including images
    fetch(process.env.GATSBY_SANITY_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query {
	StoreSettings(id: "MainStore") {
    storeName
    slicemaster {
      name
      _id
    }
    hotSlices {
      name
      _id
    }
  }
}        
        `,
      }),
    })
      .then((res) => res.json())
      // Insert a pause here before resolving this intermediate promise
      .then(
        (res) => new Promise((resolve) => setTimeout(() => resolve(res), 3000))
      )
      .then((res) => {
        // Check for errors

        // NOTE that each of these setXXX methods will trigger a re-render.  So we'll
        // end up with 2 re-renders here with the 1st render only having data for slicemasters
        // since we won't yet have run setHotSlices
        setSlicemasters(res.data.StoreSettings.slicemaster);
        setHotSlices(res.data.StoreSettings.hotSlices);
      });
  }, []);

  return { hotSlices, slicemasters };
}
