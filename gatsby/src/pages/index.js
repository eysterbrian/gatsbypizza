import React from 'react';
import { HomepageGrids, ItemsGrid } from '../components/Grids';
import LoadingGrid from '../components/LoadingGrid';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
  console.log(slicemasters);
  return (
    <div>
      <h2 className="mark">SliceMasters on duty</h2>
      <p>Ready for action!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters.length && <p>No one working right now!</p>}
      <ItemsGrid>
        {slicemasters &&
          slicemasters.map((slicemaster) => (
            <div key={slicemaster.id}>{slicemaster.name}</div>
          ))}
      </ItemsGrid>
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="mark">Hot out of the oven!</h2>
      <p>Come on and buy 'em by the slice</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices.length && <p>Nothin' in the case</p>}
      <ItemsGrid>
        {hotSlices &&
          hotSlices.map((slice) => <div key={slice.id}>{slice.name}</div>)}
      </ItemsGrid>
    </div>
  );
}

export default function HomePage() {
  const { hotSlices, slicemasters } = useLatestData();

  console.log({ hotSlices, slicemasters });

  return (
    <div className="center">
      <h1>The best pizza around!</h1>
      <p>Open every day from 11am-11pm</p>
      <HomepageGrids>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomepageGrids>
    </div>
  );
}
