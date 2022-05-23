import * as React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Item from '../commons/Item';
import { useUserStore } from '../../providers/UserProvider';
import ConfigUtilsStore from '../../stores/ConfigUtilsStore';

const useStyles = makeStyles((theme) => ({
  alert: {
    display: 'flex',
    marginBottom: '0.5rem',
    color: theme.palette.primary.main,
    alignItems: 'center'
  }
}));

const CountServicesUser = observer(() => {
  let params = useParams();
  const classes = useStyles();
  const UserStore = useUserStore();

  return (
    <>
      {UserStore.isAdmin ? (
        <Item>
          <span className={classes.alert}>
            <ErrorOutlineIcon />
            {UserStore.profile.services_current + 1 ==
            ConfigUtilsStore.configs.qnt_services_to_discount
              ? ' Você terá um desconto nesse serviço!'
              : ` Este é o serviço ${UserStore.profile.services_current + 1}/${
                  ConfigUtilsStore.configs.qnt_services_to_discount
                } para ganhar um descontinho!`}
          </span>
        </Item>
      ) : (
        <Item>
          <span className={classes.alert}>
            <ErrorOutlineIcon />
            {UserStore.profile.services_current + 1 ==
            ConfigUtilsStore.configs.qnt_services_to_discount
              ? ' Você terá um desconto nesse serviço!'
              : ` Este é o serviço ${UserStore.profile.services_current + 1}/${
                  ConfigUtilsStore.configs.qnt_services_to_discount
                } para ganhar um descontinho!`}
          </span>
        </Item>
      )}
    </>
  );
});

export default CountServicesUser;
