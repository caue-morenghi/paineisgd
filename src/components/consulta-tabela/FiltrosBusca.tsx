import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FormControlLabel, Checkbox, TextField } from '@mui/material';

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
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Filtros
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
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
          <FormControlLabel
            control={<Checkbox checked={camposFiltro.cnpj} onChange={() => handleCheckboxChange('cnpj')} />}
            label="Documento"
          />
          <FormControlLabel
            control={<Checkbox checked={camposFiltro.ip} onChange={() => handleCheckboxChange('ip')} />}
            label="IP"
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