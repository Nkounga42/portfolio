import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import * as UI from "./components/UICompoents";
import * as Screen from "./pages/Router";
import App from "./App";
import "./index.css";

const href = window.location.pathname;

const route = {
  Home: { path: "/", component: <App /> },
  Blog: { path: "/blog", component: <Screen.Blog /> },
  About: { path: "/about", component: <Screen.About /> },
  Contact: { path: "/contact", component: <Screen.Contact /> },
  Experience: { path: "/experience", component: <Screen.Experience /> },
  Projects: { path: "/projects", component: <Screen.Project /> },
  ProjetOverview: { path: "/projects/:slug", component: <Screen.ProjetOverview /> },
  Skills: { path: "/skills", component: <Screen.Skills /> },
  Page404: { path: "/404", component: <Screen.Page404 /> },
  Article: { path: "/article", component: <Screen.Article /> },
};

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <>
      <BrowserRouter>
        {href === route.Contact.path && <UI.Navbar />}
        {href !== route.Page404.path && <UI.Header />}
        <Routes>
          {Object.values(route).map((page) => (
            <Route key={page.path} path={`${page.path}`} element={page.component} />
          ))}
          <Route path="*" element={<Navigate to={route.Page404.path} />} />
        </Routes>
      </BrowserRouter>

      <UI.shadowOverlay direction="toTop" position="bottom" />
    </>
  );
}
