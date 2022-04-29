import React, { useMemo, memo } from 'react';

import { GridToolbarContainer } from '@mui/x-data-grid';
import { cloneElement } from 'react';

const CustomToolbar = memo(({ buttons }) => {
  const renderedButtons = useMemo(
    () =>
      buttons.map((button) => {
        return cloneElement(button, {
          key: button.props.name
        });
      }),
    [buttons]
  );

  return <GridToolbarContainer>{renderedButtons}</GridToolbarContainer>;
});

export default CustomToolbar;
