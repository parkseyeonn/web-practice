import { createBrowserRouter } from "react-router-dom";
import Root from "./routers/Root";
import Home from "./routers/Home";
import Login from "./routers/Login";
import NotFound from "./routers/NotFound";
import SignUp from "./routers/SignUp";
import Profile from "./routers/users/Profile";
import Followers from "./routers/users/Followers";
import Error from "./components/Error";
import ROUTE from "./route";

// todo isLoggedIn 추가
const router = createBrowserRouter([
  {
    path: ROUTE.HOME,
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: ROUTE.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTE.SIGNUP,
        element: <SignUp />,
      },
      {
        path: "/users/:nickname",
        element: <Profile />,
        children: [
          {
            path: "followers",
            element: <Followers />,
          }
        ],
      }
    ],
    errorElement: <NotFound />,
  }
]);

export default router;