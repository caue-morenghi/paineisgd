import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import nfsrc from "../data/kfc.jpg";
import { IconButton, Tooltip } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { TabelaNF } from "./nf-tabela/TabelaNF";

const style = {
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  position: "absolute", // Adiciona posição absoluta
  top: "50%", // Posiciona na metade da tela verticalmente
  left: "50%", // Posiciona na metade da tela horizontalmente
  transform: "translate(-50%, -50%)", // Ajusta a posição para centralizar exatamente
};

export type TNFiscal = {
  id: number;
  data: string;
  cnpj: string;
  numero: string;
  valor: string;
  descricao: string;
};

export default function NFEspecificada({
  id,
  cnpj,
  data,
  numero,
  valor,
  descricao,
}: TNFiscal) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    console.log(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title="Visualizar nota fiscal" onClick={handleOpen}>
        <IconButton>
          <Visibility />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: "100%" }}>
            <Typography
              sx={{ textAlign: "center" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              <span style={{ fontWeight: 600 }}>Consulta NF Despesa Nº</span>{" "}
              {numero}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={nfsrc} alt="" width={100} style={{ margin: "1em" }} />
            <TabelaNF
              id={id}
              cnpj={cnpj}
              data={data}
              descricao={descricao}
              numero={numero}
              valor={valor}
            />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600 }} variant="h6">Descrição da Nota Fiscal</Typography>
            <Typography>- {descricao}</Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
