import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { TBanco, TBancoConsulta, updatebanco } from "../../api/usuarios/BancosService";
import EditFormBD, { TEditBD } from "./EditFormBDhook";

type TBancoObj = {
  banco: TBancoConsulta;
};

export const FormEditBD = ({ banco }: TBancoObj) => {
  const { errors, handleSubmit, register, setValue, handleDataSubmit } =
    EditFormBD();

  const handleSetValues = useCallback(() => {
    setValue("cnpj", banco.cnpj);
    setValue("ip", banco.ip);
    setValue("porta", banco.porta);
    setValue("usuario", banco.usuario);
    setValue("senha", banco.senha);
    setValue("nome", banco.nome);
    setValue("situacao", banco.situacao);
  }, []);

  useEffect(() => {
    handleSetValues();
  }, [handleSetValues, banco]);

  const handleTeste = async (data: TEditBD) => {
    const convertedData = {
      id: banco.id,
      cnpj: parseFloat(data.cnpj),
      ip: parseFloat(data.ip),
      porta: parseFloat(data.porta),
      usuario: data.usuario,
      senha: data.senha,
      nome: data.nome,
      situacao: parseFloat(data.situacao),
    };
    console.log(convertedData);
    //await updatebanco(convertedData);
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
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
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
                type="number"
                {...register("cnpj")}
                disabled
            />
          </Tooltip>
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
            type="number"
            {...register("ip")}
          />
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
            <MenuItem value={1}>Ativo</MenuItem>
            <MenuItem value={0}>Inativo</MenuItem>
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
