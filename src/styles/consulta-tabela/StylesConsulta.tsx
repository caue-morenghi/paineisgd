import { Box, Link } from "@mui/material";
import { ReactNode } from "react";

interface CustomBoxProps {
  children: ReactNode;
}

export const ContainerConsultas = ({ children }: CustomBoxProps) => {
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

export const LinkBD = ({ children }: CustomBoxProps) => {
  return (
    <Link
      href="/menu"
      sx={{
        fontWeight: "600",
        color: "#000",
        textDecoration: "underline",
        "&:hover": { textDecoration: "none" },
        marginBottom: "10px",
      }}
    >
      {children}
    </Link>
  );
};

export const ContainerTabelaConsultas = ({ children }: CustomBoxProps) => {
  return (
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
      {children}
    </Box>
  );
};
