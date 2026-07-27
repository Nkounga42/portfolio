import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { Suspense } from "react";
import * as UI from "./components/UICompoents";
import * as Screen from "./pages/Router";

import "./index.css";
import "./aiAssistant.css";
import KeyboardShortcut from "./hooks/KeyboardShortcut";
import { LanguageProvider } from "./hooks/useLanguage";

const route = {
  Home: { paths: ["/", "/portfolio", "/portfolio/"], render: () => <Screen.Home /> },

  Blog: { paths: ["/blog", "/portfolio/blog"], component: <Screen.Blog /> },
  Search: { paths: ["/search", "/portfolio/search"], component: <Screen.Search /> },

  About: { paths: ["/about", "/portfolio/about"], component: <Screen.About /> },
  Contact: { paths: ["/contact", "/portfolio/contact"], component: <Screen.Contact /> },

  Experience: { paths: ["/experience", "/portfolio/experience"], component: <Screen.Experience /> },
  Projects: { paths: ["/projects", "/portfolio/projects"], component: <Screen.Projects /> },

  ProjetOverview: {
    paths: ["/projects/:slug", "/portfolio/projects/:slug"],
    component: <Screen.ProjectPreview />,
  },

  Skills: { paths: ["/skills", "/portfolio/skills"], component: <Screen.Skills /> },
  Gallery: { paths: ["/gallery", "/portfolio/gallery"], component: <Screen.Gallery /> },
  GalleryWithSlug: { paths: ["/gallery/:slug", "/portfolio/gallery/:slug"], component: <Screen.Gallery /> },
  Page404: { paths: ["/404", "/portfolio/404"], component: <Screen.Page404 /> },

  Article: { paths: ["/article", "/portfolio/article"], component: <Screen.Article /> },
  AdminBlog: { paths: ["/admin/create/login=nk-admincode", "/portfolio/admin/create/login=nk-admincode"], component: <Screen.AdminBlog /> },
  AdminArticles: { paths: ["/admin/articles/login=nk-admincode", "/portfolio/admin/articles/login=nk-admincode"], component: <Screen.AdminArticles /> },
  AdminProjects: { paths: ["/admin/projects/login=nk-admincode", "/portfolio/admin/projects/login=nk-admincode"], component: <Screen.AdminProjects /> },
  AdminComments: { paths: ["/admin/comments/login=nk-admincode", "/portfolio/admin/comments/login=nk-admincode"], component: <Screen.AdminComments /> },
  AdminGallery: { paths: ["/admin/gallery/login=nk-admincode", "/portfolio/admin/gallery/login=nk-admincode"], component: <Screen.AdminGallery /> },
  AdminRessources: { paths: ["/admin/ressources/login=nk-admincode", "/portfolio/admin/ressources/login=nk-admincode"], component: <Screen.AdminRessources /> },
  AdminSecretRoute: { paths: ["/admin/login=nk-admincode"], component: <Screen.AdminBlog /> },
  AdminSecretRoutePortfolio: { paths: ["/portfolio/admin/login=nk-admincode"], component: <Screen.AdminBlog /> },
  ReadBlog: { paths: ["/blog/:slug", "/portfolio/blog/:slug"], component: <Screen.ReadBlog /> },
  Ressources: { paths: ["/ressources", "/portfolio/ressources"], component: <Screen.Ressources /> },
  Chat: { paths: ["/chat", "/portfolio/chat"], component: <Screen.Chat /> },
};

const BrowserDom = () => {
  const location = useLocation();
  const is404Route =
    location.pathname === "/404" ||
    location.pathname === "/portfolio/404" ||
    location.pathname === "/404/" ||
    location.pathname === "/portfolio/404/";

  return (
    <Suspense fallback={<div className="text-center p-10">Chargement...</div>}>
      {!is404Route && <UI.Header />}
      <div>
        <Suspense
          fallback={<div className="text-center p-10">Chargement...</div>}
        >
          <div className={`min-h-screen`}>
            <Routes>
              {route.Home.paths.map((path) => (
                <Route key={path} path={path} element={route.Home.render()} />
              ))}

              {Object.entries(route)
                .filter(([key]) => key !== "Home" && key !== "Page404")
                .flatMap(([key, page]) =>
                  page.paths.map((path) => (
                    <Route
                      key={`${key}-${path}`}
                      path={path}
                      element={"component" in page ? page.component : page.render()}
                    />
                  ))
                )}

              <Route path="*" element={<Screen.Page404 />} />
            </Routes>
          </div>
          {location.pathname !== "/chat" && location.pathname !== "/portfolio/chat" && (
            <UI.ShadowOverlay direction="toTop" position="bottom" />
          )}
          {!is404Route &&
            location.pathname !== "/portfolio/skills" &&
            location.pathname !== "/skills" &&
            location.pathname !== "/portfolio/search" &&
            location.pathname !== "/search" &&
            location.pathname !== "/portfolio/admin/create/login=nk-admincode" &&
            location.pathname !== "/admin/create/login=nk-admincode" &&
            location.pathname !== "/portfolio/admin/articles/login=nk-admincode" &&
            location.pathname !== "/admin/articles/login=nk-admincode" &&
            location.pathname !== "/portfolio/admin/projects/login=nk-admincode" &&
            location.pathname !== "/admin/projects/login=nk-admincode" &&
            location.pathname !== "/portfolio/admin/comments/login=nk-admincode" &&
            location.pathname !== "/admin/comments/login=nk-admincode" &&
            location.pathname !== "/portfolio/admin/gallery/login=nk-admincode" &&
            location.pathname !== "/admin/gallery/login=nk-admincode" &&
            location.pathname !== "/portfolio/admin/ressources/login=nk-admincode" &&
            location.pathname !== "/admin/ressources/login=nk-admincode" &&
            location.pathname !== "/portfolio/chat" &&
            location.pathname !== "/chat" && <UI.Footer />}
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