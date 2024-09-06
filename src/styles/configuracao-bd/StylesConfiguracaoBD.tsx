import { Box, Link } from "@mui/material";
import { ReactNode } from "react";

interface CustomBoxProps {
  children: ReactNode;
}

export const ContainerConfiguracaoBanco = ({ children }: CustomBoxProps) => {
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
      {children}
    </Box>
  );
};

export const SecaoPrincipal = ({ children }: CustomBoxProps) => {
  return (
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
      {children}
    </Box>
  );
};
export const LinkConfiguracaoBD = ({ children }: CustomBoxProps) => {
  return (
    <Link
      href="/menu"
      sx={{
        fontWeight: "600",
        color: "#000",
        textDecoration: "underline",
        "&:hover": { textDecoration: "none" },
      }}
    >
      {children}
    </Link>
  );
};
