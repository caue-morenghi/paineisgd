import { Box, TableCell } from "@mui/material";
import { ReactNode } from "react";

interface CustomBoxProps {
  children: ReactNode;
}

export const ContainerBD = ({ children }: CustomBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {children}
    </Box>
  );
};
export const GridFormEditBD = ({ children }: CustomBoxProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {children}
    </Box>
  );
};
export const CampoBD = ({ children }: CustomBoxProps) => {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        textAlign: "left" 
      }}
    >
      {children}
    </Box>
  );
};
export const CampoGridFormEditBD = ({ children }: CustomBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        width: "45%",
      }}
    >
      {children}
    </Box>
  );
};
export const ButtonFormEditBD = ({ children }: CustomBoxProps) => {
  return (
    <button
      style={{
        border: "none",
        padding: ".5em",
        fontSize: "1.05rem",
        cursor: "pointer",
        backgroundColor: "#5f5f5f",
        color: "#fff",
        marginTop: "1em",
      }}
    >
      {children}
    </button>
  );
};

export const CelulaBancoTabela = ({ children }: CustomBoxProps) => {
  return <TableCell sx={{ textAlign: "center" }}>{children}</TableCell>;
};

type TSpanSituacao = {
  children: ReactNode;
  cor: string;
};

export const SpanSituacao = ({ children, cor }: TSpanSituacao) => {
  return <span style={{ color: cor }}>{children}</span>;
};
