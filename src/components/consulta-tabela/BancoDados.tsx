import { IconButton, TableRow, Tooltip } from "@mui/material";
import { TBancoConsulta } from "../../api/usuarios/BancosService";
import EditBD from "../form-bd/EditBD";
import { RemoveCircle } from "@mui/icons-material";
import Senha from "./Senha";
import { inserirMascaraCnpj, inserirMascaraCpf } from "../../functions/regexmasks";
import { CelulaBancoTabela, SpanSituacao } from "../../styles/form-bd/StylesFormEditBD";

type TBancoObj = {
  banco: TBancoConsulta;
};

export const BancoDados = ({ banco }: TBancoObj) => {
  const desativarBanco = async (banco: TBancoConsulta) => {
    const convertedbanco = {
      id: banco.id,
      cnpj: banco.cnpj,
      ip: banco.ip,
      porta: banco.porta,
      usuario: banco.usuario,
      senha: banco.senha,
      nome: banco.nome,
      nome_antigo: banco.nome,
      situacao: parseInt(banco.situacao) === 1 ? 0 : 1,
      cnpj_antigo: banco.cnpj,
    };
    console.log(convertedbanco);

    try {
      const response = await fetch("http://localhost:5000/update-banco", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertedbanco),
      });
      const result = await response.json();
      console.log(result);
      const resposta = String(result.output);
      console.log(resposta);
      if (resposta.includes("sucesso")) {
        alert("Banco atualizado com sucesso!");
        window.location.reload();
      }
      if (resposta.includes("Erro ao conectar ao banco de dados")) {
        alert(
          "Erro ao atualizar banco de dados. Uma ou mais credenciais podem estar incorretas."
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const returnDocumento = (cnpj: string) => {
    if (cnpj.length === 11) {
      return inserirMascaraCpf(cnpj);
    } else {
      return inserirMascaraCnpj(cnpj);
    }
  };

  return (
    <TableRow sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}>
      {/* <CelulaBancoTabela>{banco.id}</CelulaBancoTabela> */}
      <CelulaBancoTabela>{returnDocumento(banco.cnpj)}</CelulaBancoTabela>
      <CelulaBancoTabela>{banco.ip}</CelulaBancoTabela>
      <CelulaBancoTabela>{banco.porta}</CelulaBancoTabela>
      <CelulaBancoTabela>{banco.usuario}</CelulaBancoTabela>
      <CelulaBancoTabela><Senha senha={banco.senha}/></CelulaBancoTabela>
      <CelulaBancoTabela>{banco.nome}</CelulaBancoTabela>
      <CelulaBancoTabela>
        {parseInt(banco.situacao) === 1 
            ? <SpanSituacao cor="#30b64f">Ativado</SpanSituacao>
            : <SpanSituacao cor="#f44336">Desativado</SpanSituacao>
        }
      </CelulaBancoTabela>
      <CelulaBancoTabela><EditBD banco={banco} key={banco.id} /></CelulaBancoTabela>
      <CelulaBancoTabela>
        <Tooltip title={parseInt(banco.situacao) === 1 ? "Desativar" : "Ativar"}>
          <IconButton onClick={() => desativarBanco(banco)}>
            <RemoveCircle />
          </IconButton>
        </Tooltip>
      </CelulaBancoTabela>
    </TableRow>
  );
};
