import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { SelecionarNF } from "../pages/SelecionarNF";
import { Menu } from "../pages/Menu";
import { RecebimentoNF } from "../pages/RecebimentoNF";
import { ConsultaNF } from "../pages/ConsultaNF";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/selecionarnf',
        element: <SelecionarNF />
      }, 
      {
        path: '/menu',
        element: <Menu />
      },
      {
        path: '/recebimentonf',
        element: <RecebimentoNF />
      },
      {
        path: 'consultarnf',
        element: <ConsultaNF />
      }
    ]
  },
]);
