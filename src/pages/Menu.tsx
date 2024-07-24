import { Box, Typography, Link } from "@mui/material";

export const Menu = () => {
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
        Recebimento de notas fiscais
      </Typography>

      <Box sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', backgroundColor: "#fff", display: 'flex', flexDirection: 'column', textAlign: 'center', padding: 3, width: '50%' }}>
        <Link
            href="/selecionarnf"
            sx={{
                fontWeight: '600',
                color: '#000', // Azul claro para os links
                textDecoration: 'underline',
                '&:hover': {
                    textDecoration: 'none',
                },
                marginBottom: '2em'
            }}
        >
            Receber notas fiscais
        </Link>
        <Link
            href="/consultarnf"
            sx={{
            fontWeight: '600',
            color: '#000', // Azul claro para os links
            textDecoration: 'underline',
            '&:hover': {
                textDecoration: 'none',
            },
            }}
        >
            Consultar notas fiscais
        </Link>
      </Box>
    </Box>
  );
};