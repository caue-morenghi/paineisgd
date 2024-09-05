import { TableCell, TableHead, TableRow } from "@mui/material";

export const TabelaHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          ID
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          Documento
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          IP
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          Porta
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          Usuário
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          Senha
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          Nome BD
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          Situação
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
