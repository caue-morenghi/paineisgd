import { Box, Checkbox, Typography } from "@mui/material";
import FBDForm, { TBDForm } from "./formBDhook";
import { useEffect, useState } from "react";
import {
  filtrarIp,
  inserirMascaraCnpj,
  inserirMascaraCpf,
  limitarPorta,
} from "../../functions/cnpj";

export const FormBD = () => {
  const { handleSubmit, register, errors, watch, setValue } = FBDForm();
  const [documentType, setDocumentType] = useState<"cpf" | "cnpj" | null>(null);

  const cnpjValue = watch("cnpj");
  const ipValue = watch("ip");
  const portaValue = watch("porta");

  useEffect(() => {
    if (cnpjValue) {
      const maskedValue =
        documentType === "cpf"
          ? inserirMascaraCpf(cnpjValue)
          : inserirMascaraCnpj(cnpjValue);
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
  }, [portaValue, ipValue, cnpjValue, documentType, setValue]);

  const handleDocumentTypeChange = (type: "cpf" | "cnpj") => {
    setDocumentType(type);
    setValue("cnpj", "");
  };

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
      const response = await fetch("http://localhost:5000/run-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertedData),
      });
      const result = await response.json();
      const resposta = String(result.output);
      console.log(resposta)
      if (resposta.includes("Duplicate entry")) {
        alert("Erro ao inserir dados: Nome do banco já foi cadastrado!");
      }
      if (result.output === "Credenciais salvas com sucesso!\n") {
        alert("Credenciais salvas com sucesso!");
        window.location.reload();
      }
      if (resposta.includes("Erro ao conectar ao banco de dados")) {
        alert("Erro ao inserir dados: Uma ou mais credenciais podem estar incorretas.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
          <Typography sx={{ fontWeight: 600 }}>
            Selecione o documento:{" "}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Checkbox
              checked={documentType === "cpf"}
              onChange={() => handleDocumentTypeChange("cpf")}
            />
            <Typography>CPF</Typography>
            <Checkbox
              checked={documentType === "cnpj"}
              onChange={() => handleDocumentTypeChange("cnpj")}
            />
            <Typography>CNPJ</Typography>
          </Box>
        </Box>
        {documentType && (
          <Box
            sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
          >
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
              placeholder={
                documentType === "cpf" ? "000.000.000-00" : "00.000.000/0000-00"
              }
              {...register("cnpj")}
            />
            {errors.cnpj && (
              <span style={{ color: "#b32929", fontWeight: 600 }}>
                {errors.cnpj.message}
              </span>
            )}
          </Box>
        )}
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
          {errors.ip && (
            <span style={{ color: "#b32929", fontWeight: 600 }}>
              {errors.ip.message}
            </span>
          )}
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
          {errors.porta && (
            <span style={{ color: "#b32929", fontWeight: 600 }}>
              {errors.porta.message}
            </span>
          )}
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
          {errors.usuario && (
            <span style={{ color: "#b32929", fontWeight: 600 }}>
              {errors.usuario.message}
            </span>
          )}
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
          {errors.senha && (
            <span style={{ color: "#b32929", fontWeight: 600 }}>
              {errors.senha.message}
            </span>
          )}
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
          {errors.nome && (
            <span style={{ color: "#b32929", fontWeight: 600 }}>
              {errors.nome.message}
            </span>
          )}
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