import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react';
import { useSnackbar } from 'notistack';

import AuthStore from '../../stores/AuthStore';
import ScheduleStore from '../../stores/ScheduleStore';

import Dashboard from '../../components/Dashboard';
import List from '../../components/commons/List';

const ScheduleListPage = observer(() => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const columns = [
    {
      headerName: 'Nome do barbeiro',
      field: 'barber_name',
      width: 250
    },
    {
      headerName: 'Telefone',
      field: 'barber_telephone',
      width: 200
    },
    {
      headerName: 'Email',
      field: 'email',
      width: 200
    }
  ];

  const getAll = useCallback(async () => {
    return await ScheduleStore.findAll(
      () => {},
      (msg) => {
        enqueueSnackbar(msg, {
          variant: 'error'
        });
      }
    );
  }, [enqueueSnackbar]);

  useEffect(() => {
    const userIsAdmin = async () => {
      await AuthStore.userIsAdmin((msg) => {
        enqueueSnackbar(msg, {
          variant: 'error'
        });
        navigate('/not_authorized');
      });
    };

    userIsAdmin();
    getAll();
  }, [getAll, enqueueSnackbar, navigate]);

  const deleteRegister = async (id) => {
    await ScheduleStore.delete(id, (msg) => {
      enqueueSnackbar(msg, {
        variant: 'error'
      });
    });
    await getAll();
  };

  const newPage = (e) => {
    e.preventDefault();
    navigate('/agendas/novo');
  };

  return (
    <Dashboard>
      <List
        rows={ScheduleStore.data}
        columns={columns}
        onNewPage={newPage}
        linkEditPage="/agendas/edite"
        deleteRegister={deleteRegister}
        titleConfirmDialog="Você realmente deseja deletar essa agenda ?"
        subTitleConfirmDialog="Você não poderá desfazer essa alteração!"
      />
    </Dashboard>
  );
});

export default ScheduleListPage;
