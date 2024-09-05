import { Box, Typography, Link } from "@mui/material";
import { TabelaConsultaNFs } from "../components/consulta-tabela/TabelaConsultaNFs";

export const ConsultaNF = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F0F2F5",
        color: "black",
        height: "100vh",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ color: "#000" }}
      >
        Consulta de acessos de bancos de dados
      </Typography>

      <Link
        href="/menu"
        sx={{
          fontWeight: "600",
          color: "#000",
          textDecoration: "underline",
          "&:hover": {
            textDecoration: "none",
          },
          marginBottom: "10px"
        }}
      >
        Voltar
      </Link>

      <Box
        sx={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          padding: 3,
          width: "90%",
          overflowY: "scroll",
        }}
      >
        <TabelaConsultaNFs />
      </Box>
    </Box>
  );
};
