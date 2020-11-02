import { useEffect, useState } from 'react';

// Rather than import the real gql, we just define it to return the string here
// so that VSCode will do code formatting on gql`` strings
const gql = String.raw;

export default function useStoreSettings() {
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
        // NOTE that this is a fake 'gql' that just returns the string.
        // We're doing this to trick VSCode into giving us gql code formatting
        query: gql`
          query {
            StoreSettings(id: "MainStore") {
              storeName
              slicemaster {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
              hotSlices {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
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
      })
      .catch((err) => {
        console.log('ERROR!', err);
      });
  }, []);

  return { hotSlices, slicemasters };
}
