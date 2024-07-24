import { Box, Typography } from "@mui/material";

export const RecebimentoNF = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F0F2F5', // Cinza claro como fundo
        color: 'black', // Texto preto
        height: '100vh',
        padding: '20px',
      }}
    >
      <Typography variant="h4" component="h1" sx={{ color: 'black', marginBottom: '20px' }}>
        Página de recebimento NF
      </Typography>
    </Box>
  );
};