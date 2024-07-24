import { TableCell, TableRow } from "@mui/material";
import NFEspecificada from "../NFEspecificada";

type TNotaTabela = {
  id: number;
  data: string;
  cnpj: string;
  numero: string;
  valor: string;
  descricao: string;
};

export const NotaTabela = ({
  id,
  cnpj,
  data,
  numero,
  valor,
  descricao,
}: TNotaTabela) => {
  return (
    <TableRow>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {numero}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {new Date(data).toLocaleDateString()}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {cnpj}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {valor}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        <NFEspecificada
          id={id}
          cnpj={cnpj}
          data={data}
          numero={numero}
          valor={valor}
          descricao={descricao}
        />
      </TableCell>
    </TableRow>
  );
};
