import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { TBancoConsulta } from "../../api/usuarios/BancosService";
import EditBD from "../form-bd/EditBD";
import { RemoveCircle } from "@mui/icons-material";
import Senha from "./Senha";
import { inserirMascaraCnpj, inserirMascaraCpf } from "../../functions/cnpj";

type TBancoObj = {
  banco: TBancoConsulta;
};

export const NotaTabela = ({ banco }: TBancoObj) => {

  const handleTeste = async (banco: TBancoConsulta) => {
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
      console.log(result)
      const resposta = String(result.output)
      console.log(resposta)
      if (resposta.includes('sucesso')) {
        alert("Banco atualizado com sucesso!");
        window.location.reload();
      }
      if (resposta.includes("Erro ao conectar ao banco de dados")) {
        alert("Erro ao atualizar banco de dados. Uma ou mais credenciais podem estar incorretas.");
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
  }

  return (
    <TableRow sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {banco.id}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {returnDocumento(banco.cnpj)}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {banco.ip}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {banco.porta}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {banco.usuario}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        <Senha senha={banco.senha} />
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {banco.nome}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {parseInt(banco.situacao) === 1 ? (
          <span style={{ color: "#30b64f" }}>Ativo</span>
        ) : (
          <span style={{ color: "#f44336" }}>Inativo</span>
        )}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        <EditBD banco={banco} key={banco.id} />
      </TableCell>

      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        <Tooltip
          title={parseInt(banco.situacao) === 1 ? "Desativar" : "Ativar"}
        >
          <IconButton onClick={() => handleTeste(banco)}>
            <RemoveCircle />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
