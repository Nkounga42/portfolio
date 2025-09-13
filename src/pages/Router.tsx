import { lazy } from "react";

const Article = lazy(() => import("./Article"));
const Experience = lazy(() => import("./Experience"));
const Contact = lazy(() => import("./Contact"));
const Page404 = lazy(() => import("./Page404"));
const About = lazy(() => import("./About"));
const Project = lazy(() => import("./Project"));
const Projects = lazy(() => import("./Projects"));
const Blog = lazy(() => import("./Blog"));
const Skills = lazy(() => import("./Skills"));
const ProjetOverview = lazy(() => import("./ProjetOverview"));
const ProjectPreview = lazy(() => import("./ProjectPreview"));
const Search = lazy(() => import("./Search"));
const Home = lazy(() => import("./Home"));
const Gallery = lazy(() => import("./Gallery"));


export {
  Home,
  Article,
  Experience,
  Contact,
  Page404,
  About,
  Project,
  Projects,
  ProjetOverview,
  ProjectPreview,
  Blog,
  Skills,
  Search,
  Gallery
};
