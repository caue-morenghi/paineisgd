import { Typography } from "@mui/material";
import { ContainerMenu, LinkMenu, SecaoPrincipalMenu } from "../styles/menu/StylesMenu";

export const Menu = () => {
  return (
    <ContainerMenu>
      <Typography variant="h4" component="h1" sx={{ color: 'black', marginBottom: '20px' }}>Configuração Painel GlanData</Typography>

      <SecaoPrincipalMenu>
        <LinkMenu href="/configuracaobanco">Configurar novo acesso ao banco de dados</LinkMenu>
        <LinkMenu href="/consultabancos">Consultar acessos de banco de dados</LinkMenu>
      </SecaoPrincipalMenu>
    </ContainerMenu>
  );
};