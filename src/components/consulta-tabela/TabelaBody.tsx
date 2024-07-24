import { TableBody, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getNotas, TNotaFiscalBD } from "../../api/usuarios/UsuariosService";
import { NotaTabela } from "./NotaTabela";

export const TabelaBody = () => {

    const [notasfiscais, setnotasfiscais] = useState<TNotaFiscalBD[] | undefined>([]);
    const [vazio, setvazio] = useState<true | false>(false);

    useEffect(() => {
        const notas = getNotas()
        notas.then((response) => {
            console.log(response)
            if (response?.length === 0) {
                setvazio(true)
            }
            setnotasfiscais(response)
        })
    }, []);

  return (
    <TableBody>
        {notasfiscais?.map(nota => 
            <NotaTabela 
                key={nota.id}
                data={nota.data}
                cnpj={nota.cnpj}
                numero={nota.numero}
                valor={nota.valor}
                descricao={nota.descricao}
                id={nota.id}
            />
        )}
    </TableBody>
  );
};
