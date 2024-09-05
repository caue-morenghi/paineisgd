import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, FormControlLabel, Checkbox, TextField } from '@mui/material';

interface FiltrosBuscaProps {
  camposFiltro: { [key: string]: boolean };
  termoBusca: { [key: string]: string };
  handleCheckboxChange: (campo: string) => void;
  handleInputChange: (campo: string, valor: string) => void;
}

export default function FiltrosBusca({
  camposFiltro,
  termoBusca,
  handleCheckboxChange,
  handleInputChange,
}: FiltrosBuscaProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ alignSelf: 'flex-start' }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Filtros
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}

      >
        <MenuItem sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormControlLabel
              control={<Checkbox checked={camposFiltro.nome} onChange={() => handleCheckboxChange('nome')} />}
              label="Nome do Banco"
            />
            <FormControlLabel
              control={<Checkbox checked={camposFiltro.usuario} onChange={() => handleCheckboxChange('usuario')} />}
              label="Usuário"
            />
            {Object.keys(camposFiltro).map(campo => (
              camposFiltro[campo] && (
                <TextField
                  key={campo}
                  label={`Buscar por ${campo}`}
                  variant="filled"
                  value={termoBusca[campo]}
                  onChange={(e) => handleInputChange(campo, e.target.value)}
                  InputLabelProps={{ style: { fontSize: '15px' } }}
                />
              )
            ))}
        </MenuItem>
      </Menu>
    </div>
  );
}