import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Menu } from "../pages/Menu";
import { ConsultaBancos } from "../pages/ConsultaBancos";
import { ConfiguracaoBanco } from "../pages/ConfiguracaoBanco";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/configuracaobanco',
        element: <ConfiguracaoBanco />
      }, 
      {
        path: '/menu',
        element: <Menu />
      },
      {
        path: 'consultabancos',
        element: <ConsultaBancos />
      }
    ]
  },
]);
