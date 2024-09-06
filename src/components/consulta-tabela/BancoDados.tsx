import { useState } from "react";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { TBancoConsulta } from "../../api/usuarios/BancosService";
import EditBD from "../form-bd/EditBD";
import { RemoveCircle } from "@mui/icons-material";
import Senha from "./Senha";
import { inserirMascaraCnpj, inserirMascaraCpf } from "../../functions/regexmasks";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type TBancoObj = {
  banco: TBancoConsulta;
};

export const BancoDados = ({ banco }: TBancoObj) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "warning" | "error">("success");

  const handleDataSubmit = async (banco: TBancoConsulta) => {
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
        setSnackbarMessage("Banco atualizado com sucesso!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      if (resposta.includes("Erro ao conectar ao banco de dados")) {
        setSnackbarMessage("Erro ao atualizar banco de dados. Uma ou mais credenciais podem estar incorretas.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Erro ao processar a solicitação.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const returnDocumento = (cnpj: string) => {
    if (cnpj.length === 11) {
      return inserirMascaraCpf(cnpj);
    } else {
      return inserirMascaraCnpj(cnpj);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <TableRow sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}>
        {/* <TableCell sx={{ textAlign: "center" }}>{banco.id}</TableCell> */}
        <TableCell sx={{ textAlign: "center" }}>{returnDocumento(banco.cnpj)}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{banco.ip}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{banco.porta}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{banco.usuario}</TableCell>
        <TableCell sx={{ textAlign: "center" }}><Senha senha={banco.senha} /></TableCell>
        <TableCell sx={{ textAlign: "center" }}>{banco.nome}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{parseInt(banco.situacao) === 1 ? <span style={{ color: "#30b64f" }}>Ativo</span> : <span style={{ color: "#f44336" }}>Inativo</span>}</TableCell>
        <TableCell sx={{ textAlign: "center" }}><EditBD banco={banco} key={banco.id} /></TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <Tooltip title={parseInt(banco.situacao) === 1 ? "Desativar" : "Ativar"}>
            <IconButton onClick={() => handleDataSubmit(banco)}>
              <RemoveCircle />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};