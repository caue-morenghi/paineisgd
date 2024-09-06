import { Typography } from "@mui/material";
import { FormBD } from "../components/form-bd/FormBD";
import { ContainerConfiguracaoBanco, LinkConfiguracaoBD, SecaoPrincipal } from "../styles/configuracao-bd/StylesConfiguracaoBD";

export const ConfiguracaoBanco = () => {

  return (
    <ContainerConfiguracaoBanco>
      <Typography variant="h4" component="h1" sx={{ color: "black", marginBottom: "20px" }}>Configuração de acesso ao banco de dados GlanData</Typography>
      <SecaoPrincipal>
        <FormBD/>
        <LinkConfiguracaoBD>Voltar</LinkConfiguracaoBD>
      </SecaoPrincipal>
    </ContainerConfiguracaoBanco>
  );
};
