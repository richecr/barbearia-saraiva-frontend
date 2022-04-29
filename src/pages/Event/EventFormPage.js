import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import moment from 'moment';
import { observer } from 'mobx-react';

import { Button } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import { TimelineOppositeContent } from '@mui/lab';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';

// stores and constants
import EventStore from '../../stores/EventStore';

import Item from '../../components/commons/Item';
import Dashboard from '../../components/Dashboard';
import FormIndex from '../../components/commons/Form';
import DateField from '../../components/commons/DateField';
import TimeField from '../../components/commons/TimeField';
import SelectOptions from '../../components/commons/Select';

const EventsFormPage = observer(() => {
  let params = useParams();
  const [showSchedules, setShowSchedules] = useState(false);

  useEffect(() => {
    EventStore.findAllSchedules();
    EventStore.findAllServices();

    return () => EventStore.clear();
  }, []);

  async function checkSchedule(e) {
    e.preventDefault();
    await EventStore.findSchedulesTime();
    setShowSchedules(true);
  }

  function makeTimelineItem(schedule_free, isLast) {
    const label = [schedule_free['from'], schedule_free['of']].join(' - ');
    let color = 'success';
    if (schedule_free.status === 'OCUPADO') {
      color = 'secondary';
    }

    return (
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {schedule_free.status}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color={color} />
          {!isLast && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent>{label}</TimelineContent>
      </TimelineItem>
    );
  }

  return (
    <Dashboard>
      <FormIndex
        id={params.id}
        route="/eventos"
        operation="Evento"
        title="Cadastrar Novo Evento"
        getById={async (id, cbFail) => await EventStore.findById(id, cbFail)}
        saveRegister={async (cbSuccess, cbFail) => EventStore.save(cbSuccess, cbFail)}
        updateRegister={async (id, cbSuccess, cbFail) => EventStore.update(id, cbSuccess, cbFail)}>
        <Item>
          <DateField
            required
            format="DD/MM/yyyy"
            label="Data do Evento"
            placeholder="Selecione a data para marcar o evento"
            value={EventStore.domain.date_start}
            helperText={EventStore.domain.errors.date_start}
            onBlur={(e) => EventStore.domain.validate('date_start')}
            error={EventStore.domain.errors.date_start ? true : false}
            onChange={(e) => EventStore.updateAttribute('date_start', e)}
          />
        </Item>

        <Item>
          <SelectOptions
            required
            label="Barbeiro"
            options={EventStore.options}
            value={EventStore.domain.barber}
            placeholder="Selecione o barbeiro"
            helperText={EventStore.domain.errors.barber}
            onBlur={(e) => EventStore.domain.validate('barber')}
            error={EventStore.domain.errors.barber ? true : false}
            onChange={(e) => EventStore.updateAttribute('barber', e.target.value)}
          />
        </Item>

        <Item>
          <Button variant="text" onClick={async (e) => await checkSchedule(e)}>
            Checar Horários
          </Button>
        </Item>

        <Item>
          {showSchedules && (
            <Timeline>
              {EventStore.schedules_free.map((schedule_free, idx) =>
                makeTimelineItem(schedule_free, idx === EventStore.schedules_free.length - 1)
              )}
            </Timeline>
          )}
        </Item>

        <Item>
          <SelectOptions
            required
            label="Serviço"
            value={EventStore.domain.service}
            options={EventStore.types_services}
            placeholder="Selecione o tipo de serviço"
            helperText={EventStore.domain.errors.service}
            onBlur={(e) => EventStore.domain.validate('service')}
            error={EventStore.domain.errors.service ? true : false}
            onChange={(e) => EventStore.updateAttribute('service', e.target.value)}
          />
        </Item>

        <Item>
          <TimeField
            required
            format="HH:mm"
            label="Horário"
            minTime={moment(new Date(0, 0, 0, 8))}
            placeholder="Selecione o horário"
            maxTime={moment(new Date(0, 0, 0, 18))}
            value={EventStore.domain.time_start}
            helperText={EventStore.domain.errors.time_start}
            onBlur={(e) => EventStore.domain.validate('time_start')}
            error={EventStore.domain.errors.time_start ? true : false}
            onChange={(e) => EventStore.updateAttribute('time_start', e)}
          />
        </Item>
      </FormIndex>
    </Dashboard>
  );
});

export default EventsFormPage;
