import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { TBanco, updatebanco } from "../../api/usuarios/BancosService";
import EditBD from "../form-bd/EditBD";
import { Delete, RemoveCircle } from "@mui/icons-material";
import Senha from "./Senha";
import { inserirMascaraCnpj } from "../../functions/cnpj";

type TBancoObj = {
  banco: TBanco;
};

export const NotaTabela = ({ banco }: TBancoObj) => {

  const handleTeste = async (banco: TBanco) => {
    const convertedbanco = {
      id: banco.id,
      cnpj: parseFloat(banco.cnpj),
      ip: parseFloat(banco.ip),
      porta: parseFloat(banco.porta),
      usuario: banco.usuario,
      senha: banco.senha,
      nome: banco.nome,
      situacao: parseInt(banco.situacao) === 1 ? 0 : 1,
    };
    await updatebanco(convertedbanco);
  };

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
        {inserirMascaraCnpj(banco.cnpj.toString())}
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
        <Senha senha={banco.senha}/>
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
        {parseInt(banco.situacao) === 1 ? <span style={{ color: '#30b64f' }}>Ativo</span> : <span style={{ color: '#f44336' }}>Inativo</span>}
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
        <Tooltip title={parseInt(banco.situacao) === 1 ? "Desativar" : "Ativar"}>
          <IconButton onClick={() => handleTeste(banco)}>
            <RemoveCircle />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
