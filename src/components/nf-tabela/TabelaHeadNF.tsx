import { TableCell, TableHead, TableRow } from "@mui/material";

export const TabelaHeadNF = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          Data
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          CNPJ
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          Nº NF
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          Valor
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
