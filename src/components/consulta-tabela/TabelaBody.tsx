import { TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { NotaTabela } from "./NotaTabela";
import { TBancoConsulta } from "../../api/usuarios/BancosService";

export const TabelaBody = () => {
    const [bancos, setBancos] = useState<TBancoConsulta[]>([]);
    const [vazio, setVazio] = useState<boolean>(false);

    useEffect(() => {
        const fetchBancos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-bancos');
                console.log(response.data)
                const bancos = response.data;
                if (bancos.length === 0) {
                    setVazio(true);
                }
                setBancos(bancos);
                console.log(bancos)
            } catch (error) {
                console.error("Erro ao buscar bancos de dados:", error);
                setVazio(true);
            }
        };

        fetchBancos();
    }, []);

    return (
        <TableBody>
            {bancos.map(banco => (
                <NotaTabela 
                    banco={banco}
                    key={banco.id}
                />
            ))}
        </TableBody>
    );
};