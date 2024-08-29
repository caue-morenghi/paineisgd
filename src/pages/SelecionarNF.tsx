import { Box, Typography, Link } from "@mui/material";
import { FormBD } from "../components/form-bd/FormBD";

export const SelecionarNF = () => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F0F2F5", // Cinza claro como fundo
        color: "black", // Texto preto
        height: "100vh",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ color: "black", marginBottom: "20px" }}
      >
        Configuração de acesso ao banco de dados GlanData
      </Typography>

      <Box
        sx={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          padding: 3,
          width: "60%",
        }}
      >
        <FormBD />

        <Link
          href="/menu"
          sx={{
            fontWeight: "600",
            color: "#000", // Azul claro para os links
            textDecoration: "underline",
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          Voltar
        </Link>
      </Box>
    </Box>
  );
};
