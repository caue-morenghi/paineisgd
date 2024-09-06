import { Typography } from "@mui/material";
import { TabelaConsultaBancos } from "../components/consulta-tabela/TabelaConsultaBancos";
import { ContainerConsultas, ContainerTabelaConsultas, LinkBD } from "../styles/consulta-tabela/StylesConsulta";

export const ConsultaBancos = () => {
  return (
    <ContainerConsultas>

      <Typography variant="h4" component="h1" sx={{ color: "#000" }}>Consulta de acessos de bancos de dados</Typography>

      <LinkBD>Voltar</LinkBD>

      <ContainerTabelaConsultas>
        <TabelaConsultaBancos />
      </ContainerTabelaConsultas>
      
    </ContainerConsultas>
  );
};
