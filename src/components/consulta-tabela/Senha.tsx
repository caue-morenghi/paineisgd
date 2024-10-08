import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Tooltip } from "@mui/material";
import { Visibility } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 100,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
};

type TSenhaProps = {
  senha: string;
};

export default function Senha({ senha }: TSenhaProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title="Ver senha" onClick={handleOpen}>
        <IconButton>
          <Visibility />
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography sx={{ flexWrap: "wrap", overflow: "auto" }}>{senha}</Typography>
        </Box>
      </Modal>
    </div>
  );
}
