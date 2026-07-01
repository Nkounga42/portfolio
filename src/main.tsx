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
import { LanguageProvider } from "./hooks/useLanguage";

const route = {
  Home: { path: "/portfolio/", render: () => <Screen.Home /> },

  Blog: { path: "/portfolio/blog", component: <Screen.Blog /> },
  Search: { path: "/portfolio/search", component: <Screen.Search /> },

  About: { path: "/portfolio/about", component: <Screen.About /> },
  Contact: { path: "/portfolio/contact", component: <Screen.Contact /> },

  Experience: { path: "/portfolio/experience", component: <Screen.Experience /> },
  // Project: { path: "/portfolio/projects", component: <Screen.Project /> },
  Projects: { path: "/portfolio/projects", component: <Screen.Projects /> },

  ProjetOverview: {
    path: "/portfolio/projects/:slug",
    component: <Screen.ProjectPreview />,
  },

  Skills: { path: "/portfolio/skills", component: <Screen.Skills /> },
  Gallery: { path: "/portfolio/gallery", component: <Screen.Gallery /> },
  GalleryWithSlug: { path: "/portfolio/gallery/:slug", component: <Screen.Gallery /> },
  Page404: { path: "/portfolio/404", component: <Screen.Page404 /> },

  Article: { path: "/portfolio/article", component: <Screen.Article /> },
  AdminBlog: { path: "/portfolio/blog/create", component: <Screen.AdminBlog /> },
  ReadBlog: { path: "/portfolio/blog/:slug", component: <Screen.ReadBlog /> },
  Ressources: { path: "/portfolio/ressources", component: <Screen.Ressources /> },
};

const BrowserDom = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<div className="text-center p-10">Chargement...</div>}>
      {location.pathname !== route.Page404.path && <UI.Header />}
      <div
      >
        <Suspense
          fallback={<div className="text-center p-10">Chargement...</div>}
        >
          {/* {location.pathname.includes(route.Contact.path) && <UI.Navbar />} */}
          <div className={` min-h-screen `}>
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
          </div>
          <UI.ShadowOverlay direction="toTop" position="bottom" />
          {
            location.pathname !== route.Skills.path &&
            location.pathname !== route.Search.path &&
            location.pathname !== route.AdminBlog.path && <UI.Footer />
          }
        </Suspense>
      </div>

      <KeyboardShortcut />
    </Suspense>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = (window as any)._root || ReactDOM.createRoot(container);
  (window as any)._root = root;

  root.render(
    <BrowserRouter>
      <LanguageProvider>
        <BrowserDom />
      </LanguageProvider>
    </BrowserRouter>
  );
}