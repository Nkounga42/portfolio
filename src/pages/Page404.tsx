export default function Page404() {
  return (
    <>
      <main className="min-h-screen hero bg-base-200">
        <div className="flex flex-col gap-2 items-center ">
          <div className="hero-content flex gap-20 items-start ">
            <p className="text-9xl font-bold text-primary font-medium">404</p>
            <div className="max-w-md ">
              <h1 className="mt-4 text-5xl font-bold">Page non trouvée </h1>
              <p className="py-6 text-lg text-base-content/70">
                Désolé, nous n'avons pas pu trouver la page que vous recherchez.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <a href="/" className="btn-ghost p-2">
              Retourner a la page d'accueil{" "}
              <a href="/contact" aria-hidden="true">
                →
              </a>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
