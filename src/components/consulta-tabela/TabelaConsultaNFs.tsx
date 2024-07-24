import { Table, TableContainer } from "@mui/material"
import { TabelaHead } from "./TabelaHead"
import { TabelaBody } from "./TabelaBody"

export const TabelaConsultaNFs = () => {
    return (
        <TableContainer sx={{ marginBottom: '2em' }}>
            <Table>
                <TabelaHead />
                <TabelaBody />
            </Table>
        </TableContainer>
    )
}