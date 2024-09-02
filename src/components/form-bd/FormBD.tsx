import { Box, Typography } from "@mui/material";
import FBDForm, { TBDForm } from "./formBDhook";
import { useEffect, useState } from "react";
import { filtrarIp, inserirMascaraCnpj, inserirMascaraCpf, limitarPorta } from "../../functions/cnpj";

export const FormBD = () => {
  const { handleSubmit, register, errors, watch, setValue } = FBDForm();
  const [useCpfMask, setUseCpfMask] = useState(false);
  const [useCnpjMask, setUseCnpjMask] = useState(false);

  const cnpjValue = watch("cnpj");
  const ipValue = watch("ip");
  const portaValue = watch("porta");

  useEffect(() => {
    if (cnpjValue) {
      const maskedValue = useCpfMask ? inserirMascaraCpf(cnpjValue) : inserirMascaraCnpj(cnpjValue);
      setValue("cnpj", maskedValue);
    }
    if (ipValue) {
      const filteredIp = filtrarIp(ipValue);
      setValue("ip", filteredIp);
    }
    if (portaValue) {
      const limitedPorta = limitarPorta(portaValue);
      setValue("porta", limitedPorta);
    }
  }, [portaValue, ipValue, cnpjValue, useCpfMask, setValue]);

  const handleTeste = async (data: TBDForm) => {
    const convertedData = {
      cnpj: data.cnpj,
      ip: data.ip,
      porta: parseFloat(data.porta),
      usuario: data.usuario,
      senha: data.senha,
      nome: data.nome,
      situacao: 1,
    };
    console.log(convertedData);

    try {
      const response = await fetch('http://localhost:5000/run-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertedData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result.output);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleCpfCheckboxChange = () => {
    setUseCpfMask(true);
    setUseCnpjMask(false);
  };

  const handleCnpjCheckboxChange = () => {
    setUseCpfMask(false);
    setUseCnpjMask(true);
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
        <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <Typography sx={{ fontWeight: 600 }}>Selecione o documento: </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <label>
              <input
                type="checkbox"
                checked={useCnpjMask}
                onChange={handleCnpjCheckboxChange}
              />
              CNPJ
            </label>
            <label>
              <input
                type="checkbox"
                checked={useCpfMask}
                onChange={handleCpfCheckboxChange}
              />
              CPF
            </label>
          </Box>
        </Box>
        {(useCpfMask || useCnpjMask) && (
          <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <Typography sx={{ fontWeight: 600 }}>Documento: </Typography>
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
        )}
        <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
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
        <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
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
        <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
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
        <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
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
        <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
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