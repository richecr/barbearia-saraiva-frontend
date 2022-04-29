import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';

import ConfirmDialog from '../ConfirmDialog';
import CustomToolbar from '../CustomToolbar';

const List = observer(
  ({
    rows,
    columns,
    titleConfirmDialog,
    subTitleConfirmDialog,
    onNewPage,
    deleteRegister,
    linkEditPage,
    pageSize = 10
  }) => {
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    const navigate = useNavigate();
    const columnAction = {
      headerName: 'Ações',
      field: 'actions',
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(`${linkEditPage}/${params.id}`);
              }}>
              <EditOutlined />
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setConfirmDialog({
                  isOpen: true,
                  title: titleConfirmDialog,
                  subTitle: subTitleConfirmDialog,
                  onCancel: () => {
                    setConfirmDialog({ ...confirmDialog, isOpen: false });
                  },
                  onConfirm: async () => {
                    setConfirmDialog({
                      ...confirmDialog,
                      isOpen: false
                    });
                    await deleteRegister(params.id);
                  }
                });
              }}>
              <DeleteOutlined />
            </Button>
          </div>
        );
      }
    };

    const CustomButtons = () => {
      return <CustomToolbar onClickNewPage={onNewPage} />;
    };

    const getColumns = () => {
      return [...columns, columnAction];
    };

    return (
      <>
        <div style={{ display: 'flex', width: '100%' }}>
          <DataGrid
            autoHeight
            rows={toJS(rows)}
            pageSize={pageSize}
            columns={getColumns()}
            components={{
              Toolbar: CustomButtons
            }}
          />
        </div>
        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      </>
    );
  }
);

export default List;
