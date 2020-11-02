import React from 'react';
import Layout from '../components/Layout';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
  console.log(slicemasters);
  return (
    <div>
      <p>Currently Slicing</p>
      <ul>
        {slicemasters &&
          slicemasters.map((slicemaster) => (
            <li key={slicemaster.id}>{slicemaster.name}</li>
          ))}
      </ul>
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <p>Hot out of the oven!</p>
      <ul>
        {hotSlices &&
          hotSlices.map((slice) => <li key={slice.id}>{slice.name}</li>)}
      </ul>
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
      <div>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}
