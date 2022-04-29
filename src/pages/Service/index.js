import { Grid, Link } from '@mui/material';

import Item from '../../components/commons/Item';
import Dashboard from '../../components/Dashboard';

import services from '../../assets/services.png';
import { FacebookOutlined, Instagram, MailOutlined, WhatsappOutlined } from '@mui/icons-material';

function ServicesPage() {
  return (
    <Dashboard>
      <Grid container xs={12}>
        <Grid item md={8} sm={12}>
          <img src={services} alt="Imagem de catálogo de serviços" />
        </Grid>
        <Grid item md={4} sm={12}>
          <Item align="start" marginBottom={10}>
            <h2>Redes Sociais</h2>

            <Grid item display="flex" flexDirection="row" alignItems="center" marginBottom={1}>
              <Instagram />
              <Link
                href="https://www.instagram.com/barbeirosaraiva/"
                target="_blank"
                underline="hover">
                @barbeirosaraiva
              </Link>
            </Grid>

            <Grid item display="flex" flexDirection="row" alignItems="center" marginBottom={1}>
              <FacebookOutlined />
              <Link
                href="https://www.facebook.com/Barbearia-Saraiva-Barbeiro-107611954431970/"
                target="_blank"
                underline="hover">
                @Barbearia-Saraiva-Barbeiro
              </Link>
            </Grid>

            <Grid item display="flex" flexDirection="row" alignItems="center">
              <WhatsappOutlined />
              <Link
                href="https://api.whatsapp.com/send?phone=5581998705540"
                target="_blank"
                underline="hover">
                +55 81 99870-5540
              </Link>
            </Grid>
          </Item>

          <Item align="start" marginBottom={10}>
            <h2>Sobre</h2>

            <Grid item display="flex" flexDirection="row" alignItems="center" marginBottom={1}>
              {/* <EnvironmentOutlined /> */}
              <Link href="https://g.page/barbeirosaraiva?share" target="_blank" underline="hover">
                R. Silvia Ferreira, 3 - Piedade, Jaboatão dos Guararapes - PE, 54400-220
              </Link>
            </Grid>

            <Grid item display="flex" flexDirection="row" alignItems="center" marginBottom={1}>
              <MailOutlined />
              <Link href="mailto:emanuelsaraivamenezes@gmail.com" underline="hover">
                emanuelsaraivamenezes@gmail.com
              </Link>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Dashboard>
  );
}

export default ServicesPage;
