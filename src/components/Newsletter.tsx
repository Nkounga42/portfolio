import { Calendar, HandMetal } from "lucide-react";

export default function Newsletter() {
  return (
    <div className="relative isolate flex justify-center py-16 sm:py-24 lg:py-32 min-h-[4  00px] bg-base-200">
      <div className="hero-content flex- col items-start col-revers lg:flex-row max-w-5xl gap-8">
        <div className="text-center lg:text-left max-w-xl">
          <h2 className="text-4xl font-bold">
            Abonnez-vous à notre newsletter
          </h2>
          <p className="py-6 text-base-content/70">
            Recevez directement dans votre boîte mail mes derniers articles,
            projets et réflexions sur le développement, le design et les idées
            qui m'inspirent. Un concentré d’actualités, d’astuces et de
            nouveautés <br /> <br />{" "}
            <b>– Sans spam, juste du contenu authentique</b>.
          </p>
          <div className="join">
            <input
              type="email"
              placeholder="Enter votre email"
              className="input input-bordered join-item"
              required
            />
            <button className="btn btn-primary join-item">S'Abonner</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
          <div className="  ">
            <div className="">
              <div className="rounded-md flex gap-2 mb-4">
                <Calendar className="w-6 h-6" />
                <h3 className="card-title">Articles hebdomadaires</h3>
              </div>
              <p className="text-base-content/70">
                Chaque semaine, découvrez un nouvel article sur mes projets,
                idées et explorations créatives. Court. Inspirant. Direct.
              </p>
            </div>
          </div>

          <div className=" ">
            <div className="">
              <div className="rounded-md flex gap-2 mb-4">
                <HandMetal className="w-6 h-6" />
                <h3 className="card-title">Zero spam</h3>
              </div>
              <p className="text-base-content/70">
                Juste du contenu pertinent, quand il le faut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
