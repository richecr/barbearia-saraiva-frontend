import React, { memo } from 'react';

import { Button } from '@mui/material';
import { InsertDriveFileOutlined } from '@mui/icons-material';

const NewButton = memo(({ onClick }) => {
  return (
    <Button startIcon={<InsertDriveFileOutlined />} onClick={onClick}>
      Novo
    </Button>
  );
});

export default NewButton;
