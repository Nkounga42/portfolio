import { useParams, Link, useNavigate } from "react-router-dom";
import { projets } from "../libs/data";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag, ArrowRight } from "lucide-react";
import { scrollToTop } from "../tools/tools";

export default function ProjectPreview() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find the project by slug

  // If project not found, redirect to projects page
  // if (!project) {
  //     return <Navigate to="/portfolio/projects" replace />;
  // }
  const indexActuel = projets.findIndex((p) => p.slug === slug);
  const project = projets[indexActuel];
  const projetPrecedent = projets[indexActuel - 1];
  const projetSuivant = projets[indexActuel + 1];
  const previousProject = () => {
    scrollToTop();
    if (projetPrecedent) navigate(`/portfolio/projets/${projetPrecedent.slug}`);
  };

  const nextProject = () => {
    scrollToTop();
    if (projetSuivant) navigate(`/portfolio/projets/${projetSuivant.slug}`);
  };
  return (
    <div className="min-h-screen mx-auto bg-base-100 mt-20">
      <div className="container mx-auto px-4 max-w-5xl">

        <Link
          to="/portfolio/projects"
          className="btn btn-ghost btn-sm rounded-full mb-3  -translate-x-3.5"
          title="Retour aux projets"
        >
          <ArrowLeft className="w-4 h-4" />Retour
        </Link>
        {/* <div className="flex items-center gap-4 mb-4">
                        <div>
                            <h1 className="text-3xl font-bold">{project.nom}</h1>
                            <p className="text-base-content/70 mt-1">{project.description}</p>
                        </div>
                    </div> */}


      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* README Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mb-4 text-base-content border-b border-base-content/20 pb-2">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold mb-3 mt-8 text-base-content">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-medium mb-2 mt-6 text-base-content">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-base-content/80 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-1 text-base-content/80">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-1 text-base-content/80">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="ml-4">{children}</li>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="bg-base-200 text-primary px-1.5 py-0.5 rounded text-sm font-mono">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className="block bg-base-200 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-base-200 p-4 rounded-lg overflow-x-auto mb-4">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic text-base-content/70 mb-4">
                      {children}
                    </blockquote>
                  ),
                  img: ({ src }) => (
                    <img
                      src={src + '?raw=true'}
                      alt={src}
                      className="w-full h-auto rounded-lg border border-base-content/10 mb-4"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://i.pinimg.com/736x/36/85/37/368537ab800464ee9b14d843e117ab01.jpg";
                      }}
                    />
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-focus underline"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {project.readme}
              </ReactMarkdown>
            </div>
             {/* <div className="space-y-4" >
                {project.imagesIllustration.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border border-base-content/10">
                    <img
                      src={image}
                      alt={`${project.nom} - Image ${index + 1}`}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://i.pinimg.com/736x/36/85/37/368537ab800464ee9b14d843e117ab01.jpg";
                      }}
                    />
                  </div>
                ))} 
            </div> */}
          </div>

          {/* Project Images */}
          <div className="lg:col-span-1 mt-15">
            <div className="sticky top-20 space-y-10">
              <div>
                <h3 className="text-lg font-semibold mb-4">Aperçu du projet</h3>
                

                <div className="flex flex-wrap gap-2">
                  {project.badge.map((badge) => (
                    <img src={badge} height="20" />
                  ))}
                </div>

              </div>
              <div className="flex flex-wrap gap-2 text-sm text-base-content/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.dateCreation).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{project.Roles}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>{project.cathegorie}</span>
                </div>
              </div>

              <div>
                <div className="">
                  <h3 className="text-lg font-semibold mb-4">Technologies utilisées</h3>
                  <div className="flex flex-wrap gap-2">
                    {
                      project.technologies.map((tech) => (
                        <Link to={"/portfolio/projects#" + tech} key={tech} className="badge badge-soft badge-primary badge-outline">
                          {tech}
                        </Link>
                      ))
                    }
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex gap-3 mt-6">
                {project.links?.page && (
                  <a
                    href={project.links.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir le projet
                  </a>
                )}
                {project.links?.repository && (
                  <a
                    href={project.links.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code source
                  </a>
                )}
              </div>
            </div>
          </div>


        </div>
        <div className="flex justify-between mt-30 mb-20">
          <button
            className="btn p-5 btn-soft tooltip tooltip-info"
            data-tip={projetPrecedent ? projetPrecedent.nom : "Aucun précédent"}
            onClick={previousProject}
            disabled={!projetPrecedent}
          >
            <ArrowLeft /> Précédent
          </button>

          <button
            className="btn p-5 btn-soft tooltip tooltip-info"
            data-tip={projetSuivant ? projetSuivant.nom : "Aucun suivant"}
            onClick={nextProject}
            disabled={!projetSuivant}
          >
            Suivant <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
