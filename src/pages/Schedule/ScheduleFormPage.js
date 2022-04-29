import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { observer } from 'mobx-react';

import { TextField } from '@mui/material';

// stores and constants
import AuthStore from '../../stores/AuthStore';
import ScheduleStore from '../../stores/ScheduleStore';

import Dashboard from '../../components/Dashboard';
import Item from '../../components/commons/Item';
import PhoneField from '../../components/commons/PhoneField';
import FormIndex from '../../components/commons/Form';

const ScheduleFormPage = observer(() => {
  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const userIsAdmin = async () => {
      await AuthStore.userIsAdmin(() => navigate('/not_authorized'));
    };

    userIsAdmin();
    return () => ScheduleStore.clear();
  }, [navigate]);

  return (
    <Dashboard>
      <FormIndex
        id={params.id}
        route="/agendas"
        operation="Agenda"
        title="Cadastrar Nova Agenda"
        getById={async (id, cbFail) => await ScheduleStore.findById(id, cbFail)}
        saveRegister={async (cbSuccess, cbFail) => ScheduleStore.save(cbSuccess, cbFail)}
        updateRegister={async (id, cbSuccess, cbFail) =>
          ScheduleStore.update(id, cbSuccess, cbFail)
        }>
        <Item>
          <TextField
            required
            fullWidth
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={ScheduleStore.domain.email}
            helperText={ScheduleStore.domain.errors.email}
            onBlur={(e) => ScheduleStore.domain.validate('email')}
            error={ScheduleStore.domain.errors.email ? true : false}
            onChange={(e) => ScheduleStore.updateAttribute('email', e.target.value)}
          />
        </Item>

        <Item>
          <TextField
            required
            fullWidth
            label="Nome do Barbeiro"
            placeholder="Digite o nome do barbeiro"
            value={ScheduleStore.domain.barber_name}
            helperText={ScheduleStore.domain.errors.barber_name}
            onBlur={(e) => ScheduleStore.domain.validate('barber_name')}
            error={ScheduleStore.domain.errors.barber_name ? true : false}
            onChange={(e) => ScheduleStore.updateAttribute('barber_name', e.target.value)}
          />
        </Item>

        <Item>
          <PhoneField
            required
            label="Telefone do Barbeiro"
            placeholder="Digite o telefone do barbeiro"
            value={ScheduleStore.domain.barber_telephone}
            helperText={ScheduleStore.domain.errors.barber_telephone}
            onBlur={(e) => ScheduleStore.domain.validate('barber_telephone')}
            error={ScheduleStore.domain.errors.barber_telephone ? true : false}
            onChange={(e) => ScheduleStore.updateAttribute('barber_telephone', e.target.value)}
          />
        </Item>
      </FormIndex>
    </Dashboard>
  );
});

export default ScheduleFormPage;
