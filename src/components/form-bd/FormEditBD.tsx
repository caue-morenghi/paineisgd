import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { TBancoConsulta } from "../../api/usuarios/BancosService";
import EditFormBD, { TEditBD } from "./EditFormBDhook";

type TBancoObj = {
  banco: TBancoConsulta;
};

export const FormEditBD = ({ banco }: TBancoObj) => {
  const { handleSubmit, register, setValue, errors } = EditFormBD();

  const handleSetValues = useCallback(() => {
    setValue("cnpj", banco.cnpj);
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

  useEffect(() => {
    handleSetValues();
  }, [handleSetValues, banco]);

  const handleTeste = async (data: TEditBD) => {
    const convertedData = {
      id: data.id,
      cnpj: data.cnpj,
      ip: data.ip,
      porta: data.porta,
      usuario: data.usuario,
      senha: data.senha,
      nome: data.nome,
      nome_antigo: banco.nome,
      situacao: data.situacao,
    };

    console.log(convertedData);

    try {
      const response = await fetch("http://localhost:5000/update-banco", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertedData),
      });
      const result = await response.json();
      const resposta = String(result.output)
      console.log(resposta)
      if (resposta.includes('sucesso')) {
        alert("Banco atualizado com sucesso!");
        window.location.reload();
      }
      if (resposta.includes("Erro ao conectar ao banco de dados")) {
        alert("Erro ao atualizar banco de dados. Uma ou mais credenciais podem estar incorretas.");
      }
      if (resposta.includes("Duplicate entry")) {
        alert("Erro ao atualizar banco de dados. Nome do banco já está cadastrado.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [situacao, setsituacao] = useState(banco.situacao);
  const handleChangesituacao = (event: SelectChangeEvent) => {
    setsituacao(event.target.value as string);
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
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", textAlign: "left", width: '45%' }}
          >
            <Typography sx={{ fontWeight: 600 }}>CNPJ: </Typography>
            <Tooltip title="Não é possível alterar o CNPJ">
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
                disabled
              />
            </Tooltip>
            {errors.cnpj && (
              <span style={{ color: "#b32929", fontWeight: 600, fontSize: '12px' }}>
                {errors.cnpj.message}
              </span>
            )}
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", textAlign: "left", width: '45%' }}
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
              <span style={{ color: "#b32929", fontWeight: 600, fontSize: '12px' }}>
                {errors.ip.message}
              </span>
            )}
          </Box>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", textAlign: "left", width: '45%' }}
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
              <span style={{ color: "#b32929", fontWeight: 600, fontSize: '12px' }}>
                {errors.porta.message}
              </span>
            )}
          </Box>
          
          <Box
            sx={{ display: "flex", flexDirection: "column", textAlign: "left", width: '45%' }}
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
              <span style={{ color: "#b32929", fontWeight: 600, fontSize: '12px' }}>
                {errors.usuario.message}
              </span>
            )}
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography sx={{ fontWeight: 600 }}>Senha: </Typography>
          <input
            required
            style={{
              outline: "none",
              padding: ".5em",
              backgroundColor: "#fff",
              fontSize: "0.8rem",
              border: "1px solid #000",
            }}
            {...register("senha")}
          />
          {errors.senha && (
            <span style={{ color: "#b32929", fontWeight: 600, fontSize: '12px' }}>
              {errors.senha.message}
            </span>
          )}
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography sx={{ fontWeight: 600 }}>Nome BD: </Typography>
          <input
            required
            style={{
              outline: "none",
              padding: ".5em",
              backgroundColor: "#fff",
              fontSize: "0.8rem",
              border: "1px solid #000",
            }}
            {...register("nome")}
          />
          {errors.nome && (
            <span style={{ color: "#b32929", fontWeight: 600, fontSize: '12px' }}>
              {errors.nome.message}
            </span>
          )}
          <input type="hidden" {...register("id")} />
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography sx={{ fontWeight: 600 }}>Situação: </Typography>
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
          backgroundColor: "#4222f8",
          color: "#fff",
          marginTop: "1em",
        }}
      >
        Enviar
      </button>
    </form>
  );
};
