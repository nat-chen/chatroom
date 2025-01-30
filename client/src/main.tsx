import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { UpdatePassword } from "./pages/UpdatePassword";
import { Index } from "./pages/Index";
import { UpdateInfo } from "./pages/UpdateInfo";
import { Friendship } from "./pages/Friendship";
import { Chat } from "./pages/Chat";
import { Menu } from "./pages/Menu";
import { Group } from "./pages/Group";
import { Notification } from "./pages/Notification";

const routes = [
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "update_info",
        element: <UpdateInfo />,
      },
      {
        path: "/",
        element: <Menu />,
        children: [
          {
            path: "/",
            element: <Friendship />,
          },
          {
            path: "/group",
            element: <Group />,
          },
          {
            path: "chat",
            element: <Chat />,
          },
          // {
          // path: "collection",
          // element: <Collection />,
          // },
          {
            path: "notification",
            element: <Notification />,
          },
        ],
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
export const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
