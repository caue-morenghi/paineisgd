import { TableBody } from "@mui/material";
import { NotaTabelaNF } from "./NotaTabelaNF";
import { TNFiscal } from "../NFEspecificada";

export const TabelaBodyNF = ({
  id,
  cnpj,
  data,
  numero,
  valor,
  descricao,
}: TNFiscal) => {

  return (
    <TableBody>
      <NotaTabelaNF
        key={id}
        data={data}
        cnpj={cnpj}
        numero={numero}
        valor={valor}
        descricao={descricao}
      />
    </TableBody>
  );
};
