
const testimonials = [
  {
    name: "Sweatlana Martins",
    role: "Student at Padre Conceicao College of Engineering",
    message:
      "Devraj is hardworking, talented and a creative person. He has amazing ideas and also good programming skills. He is always enthusiastic in learning new things and sharing his valuable experiences to help people grow.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    link: "https://linkedin.com"
  },
  {
    name: "Ali Koné",
    role: "Développeur Full Stack",
    message:
      "Travailler avec Devraj a été une expérience enrichissante. Il sait comment motiver son équipe et proposer des solutions claires.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    link: "https://linkedin.com"
  },
  {
    name: "Fatou Bâ",
    role: "Étudiante en Data Science",
    message:
      "J'ai énormément appris grâce à son soutien technique. Toujours à l'écoute, patient et très compétent !",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    link: "https://linkedin.com"
  }
];

 


import { useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";



export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <section className=" text-base-content   m-50">
      <div className="max-w-6xl  h-60 mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left */}
        <div>
          <p className="text-secondary font-medium mb-2">TESTIMONIALS</p>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Ce que les autres disent
          </h2>
          <p className="text-base-content/80 text-lg">
            J’ai travaillé avec des gens extraordinaires au fil des ans. Voici ce qu’ils ont à dire sur moi.
          </p>
        </div>

        {/* Right */}
        <div className="bg-base-200/30 rounded-xl p-6 shadow-xl border border-neutral-content/10">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={current.image}
              alt={current.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-secondary"
            />
            <div>
              <h3 className="font-semibold">{current.name}</h3>
              <p className="text-sm text-base-content-400">{current.role}</p>
            </div>
          </div>
          <p className="text-base-content-300">{current.message}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto flex justify-between items-center px-2">
        <Link
          to={current.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-base-content hover:underline inline-flex items-center gap-1"
        >
          Check it out on LinkedIn <ExternalLink className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-4 text-base-content ">

          <button
            className="backdrop-blur-md h-12 w-12 border border-base-content/30 hover:border-primary/80 btn-circle hover:text-primary flex justify-center items-center"
            onClick={prev}
          >
            <ArrowLeft size="16" />
          </button>
          <span className="text-sm">{index + 1} / {total}</span>
          <button
            className="backdrop-blur-md h-12 w-12 border border-base-content/30 hover:border-primary/80 btn-circle hover:text-primary flex justify-center items-center"
            onClick={next}
          >
            <ArrowRight size="16" />
          </button>
        </div>
      </div>
    </section>
  );
}

