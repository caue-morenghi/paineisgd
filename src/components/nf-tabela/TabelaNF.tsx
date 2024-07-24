import { Table, TableContainer } from "@mui/material"
import { TabelaHeadNF } from "./TabelaHeadNF"
import { TabelaBodyNF } from "./TabelaBodyNF"
import { TNFiscal } from "../NFEspecificada"

export const TabelaNF = ({
    id,
    cnpj,
    data,
    numero,
    valor,
    descricao,
  }: TNFiscal) => {
    return (
        <TableContainer sx={{ marginBottom: '2em' }}>
            <Table>
                <TabelaHeadNF />
                <TabelaBodyNF id={id} cnpj={cnpj} data={data} descricao={descricao} numero={numero} valor={valor}/>
            </Table>
        </TableContainer>
    )
}