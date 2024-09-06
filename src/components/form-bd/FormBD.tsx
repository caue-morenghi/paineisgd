import { Box, Checkbox, Typography, IconButton } from "@mui/material";
import FBDForm, { TBDForm } from "./formBDhook";
import { useEffect, useState } from "react";
import {
  filtrarIp,
  inserirMascaraCnpj,
  inserirMascaraCpf,
  limitarCampo,
  removerLetras
} from "../../functions/cnpj";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const FormBD = () => {
  const {
    handleSubmit,
    register,
    errors,
    watch,
    setValue,
    setError,
    clearErrors,
  } = FBDForm();
  const [documentType, setDocumentType] = useState<"cpf" | "cnpj" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const cnpjValue = watch("cnpj");
  const ipValue = watch("ip");
  const portaValue = watch("porta");
  const senhaValue = watch("senha");
  const nomevalue = watch("nome");
  const usuarioValue = watch("usuario");

  useEffect(() => {
    if (cnpjValue) {
      const maskedValue =
        documentType === "cpf"
          ? inserirMascaraCpf(cnpjValue)
          : inserirMascaraCnpj(cnpjValue);
      setValue("cnpj", maskedValue);
    }
    if (ipValue) {
      const filteredIp = limitarCampo(filtrarIp(ipValue), 30);
      setValue("ip", filteredIp);
    }
    if (portaValue) {
      const limitedPorta = removerLetras(limitarCampo(portaValue, 4));
      setValue("porta", limitedPorta);
    }
    if (senhaValue) {
      const limitedSenha = limitarCampo(senhaValue, 225);
      setValue("senha", limitedSenha);
    }
    if (nomevalue) {
      const limitedNome = limitarCampo(nomevalue, 225);
      setValue("nome", limitedNome);
    }
    if (usuarioValue) {
      const limitedUsuario = limitarCampo(usuarioValue, 225);
      setValue("usuario", limitedUsuario);
    }
  }, [
    portaValue,
    ipValue,
    cnpjValue,
    documentType,
    setValue,
    setError,
    clearErrors,
    senhaValue,
    nomevalue,
    usuarioValue,
  ]);

  const handleDocumentTypeChange = (type: "cpf" | "cnpj") => {
    setDocumentType(type);
    setValue("cnpj", "");
    clearErrors("cnpj");
  };

  const handleTeste = async (data: TBDForm) => {
    if (!documentType) {
      alert("Por favor, selecione o tipo de documento (CPF ou CNPJ).");
      return;
    }

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
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/run-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertedData),
      });
      const result = await response.json();
      const resposta = String(result.output);
      console.log(resposta);
      if (resposta.includes("Duplicate entry")) {
        alert("Erro ao inserir dados: banco já foi cadastrado!");
      }
      if (resposta.includes("Credenciais salvas com sucesso!")) {
        alert("Credenciais salvas com sucesso!");
        window.location.reload();
      }
      if (resposta.includes("Erro ao conectar ao banco de dados")) {
        alert(
          "Erro ao inserir dados: Uma ou mais credenciais podem estar incorretas."
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
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
            <Typography sx={{ fontWeight: 600 }}>Documento:</Typography>
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
          <Typography sx={{ fontWeight: 600 }}>IP:</Typography>
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
            placeholder="127.0.0.1"
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
          <Typography sx={{ fontWeight: 600 }}>Porta:</Typography>
          <input
            style={{
              outline: "none",
              padding: ".5em",
              backgroundColor: "#fff",
              fontSize: "0.8rem",
              border: "1px solid #000",
            }}
            type="text"
            {...register("porta")}
            placeholder="3306"
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
          <Typography sx={{ fontWeight: 600 }}>Usuário:</Typography>
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
          <Typography sx={{ fontWeight: 600 }}>Senha:</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              style={{
                outline: "none",
                padding: ".5em",
                backgroundColor: "#fff",
                fontSize: "0.8rem",
                border: "1px solid #000",
                flex: 1,
              }}
              type={showPassword ? "text" : "password"}
              {...register("senha")}
            />
            <IconButton onClick={toggleShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
          {errors.senha && (
            <span style={{ color: "#b32929", fontWeight: 600 }}>
              {errors.senha.message}
            </span>
          )}
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography sx={{ fontWeight: 600 }}>Nome BD:</Typography>
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
          backgroundColor: "#5f5f5f",
          color: "#fff",
          border: "none",
          marginTop: "1em",
          marginBottom: "1em",
        }}
        type="submit"
        onClick={() => {
          if (!documentType) {
            alert("Por favor, selecione o tipo de documento (CPF ou CNPJ).");
            return;
          }
        }}
      >
        {isLoading ? "Aguarde, validando informações..." : "Enviar"}
      </button>
    </form>
  );
};