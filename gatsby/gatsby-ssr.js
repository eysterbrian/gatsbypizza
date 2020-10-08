import React from 'react';
import Layout from './src/components/Layout';

export function wrapPageElement({ props, element }) {
  return <Layout {...props}>{element}</Layout>;
}
