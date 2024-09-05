import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { FormEditBD } from "./FormEditBD";
import { TBanco, TBancoConsulta } from "../../api/usuarios/BancosService";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type TBancoObj = {
  banco: TBancoConsulta;
};

export default function EditBD({ banco }: TBancoObj) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title="Visualizar banco de dados" onClick={handleOpen}>
        <IconButton>
          <Edit />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>Alterar </Typography>
          <FormEditBD 
            banco={banco}
            key={banco.id}
          />
        </Box>
      </Modal>
    </div>
  );
}
