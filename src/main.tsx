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
  Home: { path: "/portfolio/", render: () => <Screen.Home /> },

  Blog: { path: "/portfolio/blog", component: <Screen.Blog /> },
  Search: { path: "/portfolio/search", component: <Screen.Search /> },

  About: { path: "/portfolio/about", component: <Screen.About /> },
  Contact: { path: "/portfolio/contact", component: <Screen.Contact /> },
  
  Experience: { path: "/portfolio/experience", component: <Screen.Experience /> },
  Projects: { path: "/portfolio/projects", component: <Screen.Project /> },

  ProjetOverview: {
    path: "/portfolio/projects/:slug",
    component: <Screen.ProjetOverview />,
  },

  Skills: { path: "/portfolio/skills", component: <Screen.Skills /> },
  Page404: { path: "/portfolio/404", component: <Screen.Page404 /> },

  Article: { path: "/portfolio/article", component: <Screen.Article /> },
};

const BrowserDom = () => {
  const location = useLocation(); 
  return (
    <Suspense fallback={<div className="text-center p-10">Chargement...</div>}>
      {location.pathname !== route.Page404.path && <UI.Header />}

      <div
        className={
          location.pathname === route.Home.path||
          location.pathname === route.Projects.path || location.pathname.includes('projects')
            ? ""
            : "mt-17"
        }
      >
        <Suspense
          fallback={<div className="text-center p-10">Chargement...</div>}
        >
          {/* {location.pathname.includes(route.Contact.path) && <UI.Navbar />} */}
          <Routes>
            <Route path={route.Home.path} element={route.Home.render()} />

            {Object.entries(route)
              .filter(([key]) => key !== "Home" && key !== "Page404")
              .map(([key, page]) => (
                <Route
                  key={key}
                  path={page.path}
                  element={"component" in page ? page.component : page.render()}
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