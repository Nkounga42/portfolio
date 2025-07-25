import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Suspense } from "react";
import * as UI from "./components/UICompoents";
import * as Screen from "./pages/Router";

import "./index.css";
import KeyboardShortcut from "./hooks/KeyboardShortcut";

const route = {
  Home: { path: "/", render: () => <Screen.Home /> },

  Blog: { path: "/blog", component: <Screen.Blog /> },
  Search: { path: "/search", component: <Screen.Search /> },

  About: { path: "/about", component: <Screen.About /> },
  Contact: { path: "/contact", component: <Screen.Contact /> },
  Experience: { path: "/experience", component: <Screen.Experience /> },
  Projects: { path: "/projects", component: <Screen.Project /> },
  ProjetOverview: {
    path: "/projects/:slug",
    component: <Screen.ProjetOverview />,
  },
  Skills: { path: "/skills", component: <Screen.Skills /> },
  Page404: { path: "/404", component: <Screen.Page404 /> },
  Article: { path: "/article", component: <Screen.Article /> },
};

const BrowserDom = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div className="text-center p-10">Chargement...</div>}>
      {location.pathname !== route.Page404.path && <UI.Header />}

      <div
        className={
          location.pathname === route.Home.path ||
          location.pathname === route.Projects.path
            ? ""
            : "mt-17"
        }
      >
        <Suspense
          fallback={<div className="text-center p-10">Chargement...</div>}
        >
          {location.pathname.includes(route.Contact.path) && <UI.Navbar />}
          <Routes>
  <Route path={route.Home.path} element={route.Home.render()} />

  {Object.entries(route)
    .filter(([key]) => key !== "Home" && key !== "Page404")
    .map(([key, page]) => (
      <Route
        key={key}
        path={page.path}
        element={
          "component" in page ? page.component : page.render()
        }
      />
    ))}

  <Route path="*" element={<Navigate to={route.Page404.path} />} />
</Routes>


          <UI.ShadowOverlay direction="toTop" position="bottom" />
          {location.pathname !== route.Skills.path &&
            location.pathname !== route.Search.path && <UI.Footer />}
        </Suspense>
      </div>

      <KeyboardShortcut />
    </Suspense>
  );
};

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <BrowserDom />
    </BrowserRouter>
  );
}
