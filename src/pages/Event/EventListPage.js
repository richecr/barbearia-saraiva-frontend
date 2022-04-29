import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';
import { useSnackbar } from 'notistack';

import EventStore from '../../stores/EventStore';

import Dashboard from '../../components/Dashboard';
import List from '../../components/commons/List';

const EventListPage = observer(() => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const columns = [
    {
      width: 200,
      type: 'string',
      field: 'schedule',
      headerName: 'Nome do barbeiro',
      valueGetter: ({ value }) => value.barber_name,
      valueFormatter: ({ value }) => value.barber_name
    },
    {
      width: 200,
      field: 'user',
      type: 'string',
      headerName: 'Nome do Cliente',
      valueGetter: ({ value }) => value.name,
      valueFormatter: ({ value }) => value.name
    },
    {
      width: 100,
      type: 'date',
      field: 'date_hour_start',
      headerName: 'Data Inicio',
      valueFormatter: ({ value }) => moment(value.replace('Z', '')).format('DD/MM - HH:mm')
    },
    {
      width: 100,
      type: 'date',
      field: 'date_hour_end',
      headerName: 'Data Final',
      valueFormatter: ({ value }) => moment(value.replace('Z', '')).format('DD/MM - HH:mm')
    },
    {
      width: 100,
      field: 'type_service',
      headerName: 'Serviço'
    }
  ];

  const getAll = useCallback(async () => {
    return await EventStore.findAll(
      () => {},
      (msg) => {
        enqueueSnackbar(msg, {
          variant: 'error'
        });
      }
    );
  }, [enqueueSnackbar]);

  useEffect(() => {
    getAll();
  }, []);

  const deleteRegister = async (id) => {
    await EventStore.delete(id);
    await getAll();
  };

  const newPage = (e) => {
    e.preventDefault();
    navigate('/eventos/novo');
  };

  return (
    <Dashboard>
      <List
        columns={columns}
        onNewPage={newPage}
        rows={EventStore.data}
        linkEditPage="/eventos/edite"
        deleteRegister={deleteRegister}
        titleConfirmDialog="Você realmente deseja deletar essa evento ?"
        subTitleConfirmDialog="Você não poderá desfazer essa alteração!"
      />
    </Dashboard>
  );
});

export default EventListPage;
