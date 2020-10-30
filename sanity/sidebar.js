import React from 'react';
import { MdSettingsApplications } from 'react-icons/md';
import S from '@sanity/desk-tool/structure-builder';

export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create a new sub-item for store settings
      S.listItem().title('Home Page').icon(MdSettingsApplications).child(
        S.editor()
          .schemaType('storeSettings')
          // Link directly to this ID, so no one can accidentally edit the wrong store
          .documentId('MainStore')
      ),

      // Add all the other menu items
      ...S.documentTypeListItems()
        // Hide the main storeSettings since we're displaying main store settings above
        .filter((item) => item.getId() !== 'storeSettings'),
    ]);
}
