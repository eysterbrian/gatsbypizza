import React from 'react';

export function wrapPageElement({ props, element }) {
  return <Layout {...props}>{element}</Layout>;
}
