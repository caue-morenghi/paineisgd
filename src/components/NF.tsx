import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { DescricaoForm } from "./DescricaoForm";
import nfsrc from "../data/kfc.jpg";

export type TNotaFiscal = {
  data: string;
  cnpj: string;
  numero: string;
  valor: string;
  src: string;
  descricao: string;
};

export default function NF() {
  const [nf, setnf] = React.useState<TNotaFiscal>();

  const handleRunScript = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/run-script");
      const data = response.data;
      const jsonStr = data.replace(/'/g, '"');
      const dataObj = JSON.parse(jsonStr);
      console.log(dataObj);
      if (dataObj.Erro === 'QR Code não encontrado na imagem.') {
        alert("Erro ao inclur Nota Fiscal. Faça novamente");
        window.location.reload()
      } else {
        if (dataObj) {
          setnf(dataObj)
        } else {
          alert("Erro ao inclur Nota Fiscal. Faça novamente");
          window.location.reload()
        }
      }
    } catch (error) {
      alert("Erro ao incluir Nota Fiscal. Faça novamente");
    }
  };

  return (
    <div>
      <Button
        onClick={handleRunScript}
        sx={{
          fontWeight: "600",
          color: "#000", // Azul claro para os links
          textDecoration: "underline",
          "&:hover": {
            textDecoration: "none",
          },
          marginBottom: "2em",
        }}
      >
        Selecionar arquivo
      </Button>
        {nf && (
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginBottom: '2em' }}>
                <DescricaoForm data={nf.data} cnpj={nf.cnpj} descricao={nf.descricao} numero={nf.numero} src={nf.src} valor={nf.valor}/>
                {/* <img src={`${process.env.PUBLIC_URL}/teste.webp`} alt="" width={200}/> */}
                <img src={nfsrc} alt="" width={200}/>
            </Box>
        )}
    </div>
  );
}
