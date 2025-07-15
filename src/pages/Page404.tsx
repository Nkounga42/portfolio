import { Link } from "react-router";

export default function Page404() {
  return (
    <>
      <main className="h-screen hero bg-base-200 ov">
        <div className="flex flex-col gap-2 items-center ">
          <div className="hero-content flex gap-20 items-start justify-start">
            <p className="text-9xl font-bold text-primary font-medium">404</p>
            <div className="max-w-md ">
              <h1 className="mt-4 text-5xl font-bold">Page non trouvée </h1>
              <p className="py-6 text-lg text-base-content/70">
                Désolé, nous n'avons pas pu trouver la page que vous recherchez.
              </p>

                <Link to="/" className="btn-ghost hover:text-primary">
                  Retourner a la page d'accueil{" "}
                    →
                </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
