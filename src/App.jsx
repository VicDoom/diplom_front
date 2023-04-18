import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { Header } from "./components";
import { Auth, Main } from "./pages";
import { UserAccount } from "./pages/UserAccount";
import { PrivateRoute } from "./components/PrivateRoute";
import { Registration } from "./pages/Registration";
import { Task } from "./pages/Task";

const routes = [
  {
    path: "/", 
    element: <Main />,
    isPrivate: true,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/user-account",
    element: <UserAccount />,
    isPrivate: true,
  },
  {
    path: "/task/:id",
    element: <Task />,
    isPrivate: true,
  },
];

function App() {
  const dispatch = useDispatch();
  dispatch({ type: "refreshAuthToken" });
  return (
    <>
      <Router>
        <Header />
        <Routes>
          {routes.map(
            (route) => route.isPrivate 
              ? <Route path={route.path} key={route.path} element={<PrivateRoute route={route.element} />} />
              : (
                <Route element={route.element} path={route.path} key={route.path} />
              )
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
