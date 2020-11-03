import React from 'react';
import { HomepageGridStyles, ItemsGridStyles } from '../components/Grids';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import useStoreSettings from '../utils/useStoreSettings';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="tilt mark">SliceMasters on duty</h2>
      <p>Ready for action!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters.length && <p>No one working right now!</p>}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="mark tilt">Hot out of the oven!</h2>
      <p>Come on and buy 'em by the slice</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices.length && <p>Nothin' in the case</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

export default function HomePage() {
  const { hotSlices, slicemasters } = useStoreSettings();

  return (
    <div className="center">
      <h1>The best pizza around!</h1>
      <p>Open every day from 11am-11pm</p>
      <HomepageGridStyles>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomepageGridStyles>
    </div>
  );
}
