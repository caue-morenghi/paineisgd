import { Table, TableContainer, Box } from "@mui/material";
import { useState } from "react";
import { TabelaHead } from "./TabelaHead";
import { TabelaBody } from "./TabelaBody";
import FiltrosBusca from "./FiltrosBusca";

export const TabelaConsultaBancos = () => {
    const [termoBusca, setTermoBusca] = useState<{ [key: string]: string }>({});
    const [camposFiltro, setCamposFiltro] = useState<{ [key: string]: boolean }>({ nome: false, usuario: false });

    const handleCheckboxChange = (campo: string) => {
        setCamposFiltro(prev => ({ ...prev, [campo]: !prev[campo] }));
        setTermoBusca(prev => ({ ...prev, [campo]: "" }));
    };

    const handleInputChange = (campo: string, valor: string) => {
        setTermoBusca(prev => ({ ...prev, [campo]: valor }));
    };

    return (
        <Box sx={{ marginBottom: '2em', display: 'flex', flexDirection: 'column' }}>
            <FiltrosBusca camposFiltro={camposFiltro} termoBusca={termoBusca} handleCheckboxChange={handleCheckboxChange} handleInputChange={handleInputChange}/>
            <TableContainer>
                <Table>
                    <TabelaHead />
                    <TabelaBody termoBusca={termoBusca} />
                </Table>
            </TableContainer>
        </Box>
    );
};