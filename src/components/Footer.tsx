import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="min-h-[40vh] py-40 bg-base-300 flex items-center justify-center text-base-content">
      <div className="flex sm:justify-start w-5xl p-4 sm:flex-row flex-col items-center  mx-4  justify-center">
        <div className="text-4xl font-serif flex items-start gap-2 mb-6">
          <span className="italic">N</span>
          <span className="italic">K</span>
          <span className="text-2xl">—</span>
        </div>
        <div className="flex flex-col items-start  text-left max-w-xl sm:ml-10 pl-4">
          <div className="text-sm mb-4 font-medium">
              Nkounga Exaucé is a designer driven by visual craft &amp; storytelling.
            <br />
            Currently fullstack developer at Wilkaî.
          </div>

          <div className="text-xs text-base-content/70 border-t border-primary/70 pt-4">
            My 2025 portfolio is under construction—while that’s happening,
            <br />
            you can find me on <Link className="link link-hover" to="http://www.linkedin.com/in/exauce-nkounga">LinkedIn</Link>, or say
            <Link className="link link-hover" to="mailto:nkoungagil@gmail.com"> nkoungagil@gmail.com</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;