
import { TableCell, TableRow } from "@mui/material";

type TNotaTabela = {
  data: string;
  cnpj: string;
  numero: string;
  valor: string;
  descricao: string;
};

export const NotaTabelaNF = ({ cnpj, data, numero, valor }: TNotaTabela) => {
  return (
    <TableRow>
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
        {numero}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {valor}
      </TableCell>
    </TableRow>
  );
};
