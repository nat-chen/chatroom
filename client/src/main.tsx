import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { UpdatePassword } from "./pages/UpdatePassword";
import { Index } from "./pages/Index";
import { UpdateInfo } from "./pages/UpdateInfo";

const routes = [
  {
    path: "/",
    element: <Index />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "update_info",
        element: <UpdateInfo />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "update_password",
        element: <UpdatePassword />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
