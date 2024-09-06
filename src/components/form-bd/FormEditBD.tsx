import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  IconButton,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { TBancoConsulta } from "../../api/usuarios/BancosService";
import EditFormBD, { TEditBD } from "./EditFormBDhook";
import {
  filtrarIp,
  inserirMascaraCnpj,
  inserirMascaraCpf,
  limitarCampo,
} from "../../functions/cnpj";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type TBancoObj = {
  banco: TBancoConsulta;
};

export const FormEditBD = ({ banco }: TBancoObj) => {
  const { handleSubmit, register, setValue, errors, watch } = EditFormBD();

  const [isCNPJ, setIsCNPJ] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleDocumentoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (isCNPJ) {
      setValue("cnpj", inserirMascaraCnpj(value));
    } else {
      setValue("cnpj", inserirMascaraCpf(value));
    }
  };

  const handleCheckboxChange = (isCNPJSelected: boolean) => {
    setIsCNPJ(isCNPJSelected);
    setValue("cnpj", "");
  };

  const handleSetValues = useCallback(() => {
    const documento = banco.cnpj;
    if (documento.length === 11) {
      setIsCNPJ(false);
      setValue("cnpj", inserirMascaraCpf(documento));
    } else if (documento.length === 14) {
      setIsCNPJ(true);
      setValue("cnpj", inserirMascaraCnpj(documento));
    } else {
      setValue("cnpj", documento);
    }
    setValue("ip", banco.ip);
    setValue("porta", banco.porta);
    setValue("usuario", banco.usuario);
    setValue("senha", banco.senha);
    setValue("nome", banco.nome);
    setValue("situacao", banco.situacao);
    setValue("id", banco.id);
  }, [
    banco.cnpj,
    banco.ip,
    banco.porta,
    banco.usuario,
    banco.senha,
    banco.nome,
    banco.situacao,
    setValue,
    banco.id,
  ]);

  const ipValue = watch("ip");
  const portaValue = watch("porta");
  const senhaValue = watch("senha");
  const nomevalue = watch("nome");
  const usuarioValue = watch("usuario");

  useEffect(() => {
    handleSetValues();
  }, [handleSetValues]);

  useEffect(() => {
    if (portaValue) {
      const limitedPorta = removerLetras(limitarCampo(portaValue, 4));
      setValue("porta", limitedPorta);
    }
  }, [portaValue, setValue]);

  useEffect(() => {
    if (ipValue) {
      const filteredIp = limitarCampo(filtrarIp(ipValue), 30);
      setValue("ip", filteredIp);
    }
  }, [ipValue, setValue]);

  useEffect(() => {
    if (senhaValue) {
      const limitedSenha = limitarCampo(senhaValue, 225);
      setValue("senha", limitedSenha);
    }
  }, [senhaValue, setValue]);

  useEffect(() => {
    if (nomevalue) {
      const limitedNome = limitarCampo(nomevalue, 225);
      setValue("nome", limitedNome);
    }
  }, [nomevalue, setValue]);

  useEffect(() => {
    if (usuarioValue) {
      const limitedUsuario = limitarCampo(usuarioValue, 225);
      setValue("usuario", limitedUsuario);
    }
  }, [usuarioValue, setValue]);

  const [isLoading, setisLoading] = useState(false);

  const cnpjvalue = watch("cnpj");

  const handleTeste = async (data: TEditBD) => {

    if (isCNPJ && cnpjvalue.length !== 18) {
      alert("CNPJ inválido! Por favor, digita novamente");
      return;
    } else if (!isCNPJ && cnpjvalue.length !== 14) {
      alert("CPF inválido! Por favor, digita novamente");
      return;
    }

    const convertedData = {
      id: data.id,
      cnpj: data.cnpj,
      ip: data.ip,
      porta: data.porta,
      usuario: data.usuario,
      senha: data.senha,
      nome: data.nome,
      nome_antigo: banco.nome,
      cnpj_antigo: banco.cnpj,
      situacao: data.situacao,
    };

    console.log(convertedData);

    try {
      setisLoading(true);
      const response = await fetch("http://localhost:5000/update-banco", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertedData),
      });
      const result = await response.json();
      console.log(result);
      const resposta = String(result.output);
      console.log(resposta);
      if (resposta.includes("sucesso")) {
        alert("Banco atualizado com sucesso!");
        window.location.reload();
      }
      if (resposta.includes("Erro ao conectar ao banco de dados")) {
        alert(
          "Erro ao atualizar banco de dados. Uma ou mais credenciais podem estar incorretas."
        );
      }
      if (resposta.includes("Duplicate entry")) {
        alert(
          "Erro ao atualizar banco de dados. Nome do banco já está cadastrado."
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setisLoading(false);
    }
  };

  const [situacao, setsituacao] = useState(banco.situacao);
  const handleChangesituacao = (event: SelectChangeEvent) => {
    setsituacao(event.target.value as string);
  };

  const removerLetras = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };

  const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = removerLetras(event.target.value);
    setValue("senha", value);
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
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              width: "45%",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Documento:</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <input
                  type="checkbox"
                  checked={isCNPJ}
                  onChange={() => handleCheckboxChange(true)}
                />
                CNPJ
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <input
                  type="checkbox"
                  checked={!isCNPJ}
                  onChange={() => handleCheckboxChange(false)}
                />
                CPF
              </label>
            </Box>
            <input
              style={{
                outline: "none",
                padding: ".5em",
                backgroundColor: "#fff",
                fontSize: "0.8rem",
                border: "1px solid #c2c2c2",
              }}
              type="text"
              {...register("cnpj")}
              onChange={handleDocumentoChange}
            />
            {errors.cnpj && (
              <span
                style={{ color: "#b32929", fontWeight: 600, fontSize: "12px" }}
              >
                {errors.cnpj.message}
              </span>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              width: "45%",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>IP:</Typography>
            <input
              style={{
                outline: "none",
                padding: ".5em",
                backgroundColor: "#fff",
                fontSize: "0.8rem",
                border: "1px solid #c2c2c2",
              }}
              type="text"
              {...register("ip")}
              placeholder="127.0.0.1"
            />
            {errors.ip && (
              <span
                style={{ color: "#b32929", fontWeight: 600, fontSize: "12px" }}
              >
                {errors.ip.message}
              </span>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              width: "45%",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Porta:</Typography>
            <input
              style={{
                outline: "none",
                padding: ".5em",
                backgroundColor: "#fff",
                fontSize: "0.8rem",
                border: "1px solid #c2c2c2",
              }}
              type="text"
              {...register("porta")}
              placeholder="3306"
            />
            {errors.porta && (
              <span
                style={{ color: "#b32929", fontWeight: 600, fontSize: "12px" }}
              >
                {errors.porta.message}
              </span>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              width: "45%",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Usuário:</Typography>
            <input
              style={{
                outline: "none",
                padding: ".5em",
                backgroundColor: "#fff",
                fontSize: "0.8rem",
                border: "1px solid #c2c2c2",
              }}
              type="text"
              {...register("usuario")}
            />
            {errors.usuario && (
              <span
                style={{ color: "#b32929", fontWeight: 600, fontSize: "12px" }}
              >
                {errors.usuario.message}
              </span>
            )}
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography sx={{ fontWeight: 600 }}>Senha:</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              required
              style={{
                outline: "none",
                padding: ".5em",
                backgroundColor: "#fff",
                fontSize: "0.8rem",
                border: "1px solid #c2c2c2",
                flex: 1,
              }}
              type={showPassword ? "text" : "password"}
              {...register("senha")}
              onChange={handleSenhaChange}
            />
            <IconButton onClick={toggleShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
          {errors.senha && (
            <span
              style={{ color: "#b32929", fontWeight: 600, fontSize: "12px" }}
            >
              {errors.senha.message}
            </span>
          )}
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography sx={{ fontWeight: 600 }}>Nome BD:</Typography>
          <input
            required
            style={{
              outline: "none",
              padding: ".5em",
              backgroundColor: "#fff",
              fontSize: "0.8rem",
              border: "1px solid #c2c2c2",
            }}
            {...register("nome")}
          />
          {errors.nome && (
            <span
              style={{ color: "#b32929", fontWeight: 600, fontSize: "12px" }}
            >
              {errors.nome.message}
            </span>
          )}
          <input type="hidden" {...register("id")} />
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography sx={{ fontWeight: 600 }}>Situação:</Typography>
          <Select
            {...register("situacao")}
            value={situacao}
            onChange={handleChangesituacao}
          >
            <MenuItem value={"1"}>Ativo</MenuItem>
            <MenuItem value={"0"}>Inativo</MenuItem>
          </Select>
        </Box>
      </Box>

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
        {isLoading ? "Aguarde, validando alterações..." : "Salvar alterações"}
      </button>
    </form>
  );
};