import { Box, Typography } from "@mui/material";
import FBDForm, { TBDForm } from "./formBDhook";
import { createBanco } from "../../api/usuarios/BancosService";
import { useEffect } from "react";
import { filtrarIp, inserirMascaraCnpj, limitarPorta } from "../../functions/cnpj";

export const FormBD = () => {
  const { handleSubmit, register, errors, watch, setValue } = FBDForm();

  const cnpjValue = watch("cnpj");
  const ipValue = watch("ip");
  const portaValue = watch("porta");

  useEffect(() => {
    if (cnpjValue) {
      const maskedCnpj = inserirMascaraCnpj(cnpjValue);
      setValue("cnpj", maskedCnpj);
    }
    if (ipValue) {
      const filteredIp = filtrarIp(ipValue);
      setValue("ip", filteredIp);
    }
    if (portaValue) {
      const limitedPorta = limitarPorta(portaValue);
      setValue("porta", limitedPorta);
    }
  }, [portaValue, ipValue, cnpjValue, setValue]);

  const handleTeste = async (data: TBDForm) => {
    const convertedData = {
      cnpj: parseFloat(data.cnpj),
      ip: parseFloat(data.ip),
      porta: parseFloat(data.porta),
      usuario: data.usuario,
      senha: data.senha,
      nome: data.nome,
      situacao: 1,
    };
    console.log(convertedData);
    //await createBanco(convertedData);
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        justifyContent: "space-between",
        width: "100%",
      }}
      onSubmit={handleSubmit(handleTeste)}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography sx={{ fontWeight: 600 }}>CNPJ: </Typography>
          <input
            style={{
              outline: "none",
              padding: ".5em",
              backgroundColor: "#fff",
              fontSize: "0.8rem",
              border: "1px solid #000",
            }}
            type="text"
            {...register("cnpj")}
          />
          {errors.cnpj && <span style={{ color: "#b32929", fontWeight: 600 }}>{errors.cnpj.message}</span>}
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography sx={{ fontWeight: 600 }}>IP: </Typography>
          <input
            style={{
              outline: "none",
              padding: ".5em",
              backgroundColor: "#fff",
              fontSize: "0.8rem",
              border: "1px solid #000",
            }}
            type="text"
            {...register("ip")}
          />
          {errors.ip && <span style={{ color: "#b32929", fontWeight: 600 }}>{errors.ip.message}</span>}
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography sx={{ fontWeight: 600 }}>Porta: </Typography>
          <input
            style={{
              outline: "none",
              padding: ".5em",
              backgroundColor: "#fff",
              fontSize: "0.8rem",
              border: "1px solid #000",
            }}
            type="number"
            {...register("porta")}
            />
            {errors.porta && <span style={{ color: "#b32929", fontWeight: 600 }}>{errors.porta.message}</span>}
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography sx={{ fontWeight: 600 }}>Usuário</Typography>
          <input
            style={{
              outline: "none",
              padding: ".5em",
              backgroundColor: "#fff",
              fontSize: "0.8rem",
              border: "1px solid #000",
            }}
            type="text"
            {...register("usuario")}
          />
          {errors.usuario && <span style={{ color: "#b32929", fontWeight: 600 }}>{errors.usuario.message}</span>}
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography sx={{ fontWeight: 600 }}>Senha</Typography>
          <input
            style={{
              outline: "none",
              padding: ".5em",
              backgroundColor: "#fff",
              fontSize: "0.8rem",
              border: "1px solid #000",
            }}
            type="text"
            {...register("senha")}
          />
          {errors.senha && <span style={{ color: "#b32929", fontWeight: 600 }}>{errors.senha.message}</span>}
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography sx={{ fontWeight: 600 }}>Nome BD: </Typography>
          <input
            style={{
              outline: "none",
              padding: ".5em",
              backgroundColor: "#fff",
              fontSize: "0.8rem",
              border: "1px solid #000",
            }}
            type="text"
            {...register("nome")}
          />
          {errors.nome && <span style={{ color: "#b32929", fontWeight: 600 }}>{errors.nome.message}</span>}
          <input type="hidden" {...register("situacao")} />
        </Box>
      </Box>
      <button
        style={{
          padding: ".5em",
          fontSize: "0.8rem",
          cursor: "pointer",
          backgroundColor: "#4222f8",
          color: "#fff",
          border: "none",
          marginTop: "1em",
          marginBottom: "1em",
        }}
      >
        Enviar
      </button>
    </form>
  );
};
