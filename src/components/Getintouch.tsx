import { ContactRound,  MapPinned } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

export default function Getintouch() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    acceptPolicy: false
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Ici vous pouvez ajouter la logique d'envoi du formulaire
      console.log('Données du formulaire:', formData);
      // Réinitialiser le formulaire après l'envoi
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        acceptPolicy: false
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div id='contactfield' className="relative isolate overflow-hidden py-8 sm:py-16 lg:py-24 xl:py-32 flex justify-center bg-base-200">

      <div className="hero-content flex-col items-start px-4 sm:px-6 lg:px-10 col-revers lg:flex-row gap-6 sm:gap-8 max-w-6xl w-full">
        <div className="max-w-xl w-full">
        <div className="text-center lg:text-left w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Entrer en contact</h2>
          <p className="py-4 sm:py-6 text-sm sm:text-base text-base-content/70">
            N'hésitez pas à me contacter pour discuter de vos projets ou pour
            toute question. Je suis toujours ravi d'échanger et de collaborer
            sur de nouvelles opportunités.
          </p>
        </div>
        
        <div className="my-8">
          <iframe
            src="https://maps.app.goo.gl/M9mkrEVGitUPioCu9"
            width="100%"
            height="300"
            style={{ border: 0 , borderRadius: "1rem" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-xl w-full">
            <div className="mb-5">
              <div>
                <div className="rounded-md flex mb-2 gap-2">
                  <ContactRound className="w-6 h-6" />
                  <h3 className="card-title">Contact</h3>
                </div>
                <a href="mailto:nkoungagil@gmail.com" className="text-base-content/70">
                  Nkoungagil@gmail.com
                </a>
                <br />
                <a href="tel:+242064493007" className="text-base-content/70">
                  +242 06 449 30 07
                </a>
              </div>
            </div>
            <div className="mb-5">
              <div>
                <div className="rounded-md flex mb-2 gap-2">
                  <MapPinned className="w-6 h-6" />
                  <h3 className="card-title">Localisation</h3>
                </div>
                <p className="text-base-content/70">République du Congo</p>
                <Link to="https://maps.app.goo.gl/M9mkrEVGitUPioCu9" className="text-base-content/70">
                  Pointe Noire - Tchimbamba
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full mb-5">
            <div className="w-full mb-5">
              <form onSubmit={handleSubmit} className="mx-auto mt-8 sm:mt-12 lg:mt-16 xl:mt-20 max-w-xl w-full">
                <div className="grid grid-cols-1 gap-x-4 sm:gap-x-8 gap-y-4 sm:gap-y-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm/6 font-semibold text-base-content">
                      Prénom
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        autoComplete="given-name"
                        className="block w-full border-base-300 border rounded-md bg-base-300 px-3.5 py-2 text-base text-base-content placeholder:text-base-400 focus:outline-1 focus:-outline-offset-2 focus:outline-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm/6 font-semibold text-base-content">
                      Nom
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                        className="block w-full border-base-300 border rounded-md bg-base-300 px-3.5 py-2 text-base text-base-content placeholder:text-base-400 focus:outline-1 focus:-outline-offset-2 focus:outline-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm/6 font-semibold text-base-content">
                      Entreprise
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        autoComplete="organization"
                        className="block w-full border-base-300 border rounded-md bg-base-300 px-3.5 py-2 text-base text-base-content placeholder:text-base-400 focus:outline-1 focus:-outline-offset-2 focus:outline-primary"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm/6 font-semibold text-base-content">
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className="block w-full border-base-300 border rounded-md bg-base-300 px-3.5 py-2 text-base text-base-content placeholder:text-base-400 focus:outline-1 focus:-outline-offset-2 focus:outline-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm/6 font-semibold text-base-content">
                      Téléphone
                    </label>
                    <div className="mt-2.5">
                      <div className="flex rounded-md bg-base-300 border-base-300 border has-[input:focus-within]:outline-1 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-primary">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block min-w-0 grow py-1.5 pr-2 sm:pr-3 pl-2 sm:pl-3 text-sm sm:text-base text-base-content placeholder:text-base-400 focus:outline-none"
                          placeholder="123-456-7890"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm/6 font-semibold text-base-content">
                      Message
                    </label>
                    <div className="mt-2.5">
                      <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-base-300 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-sm sm:text-base text-base-content placeholder:text-base-400 focus:outline-1 focus:-outline-offset-2 focus:outline-primary min-h-[80px] sm:min-h-[100px]"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-x-2 sm:gap-x-4 sm:col-span-2">
                    <fieldset className="fieldset w-full">
                      <label className="label text-xs sm:text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          name="acceptPolicy"
                          checked={formData.acceptPolicy}
                          onChange={handleChange}
                          className="toggle toggle-sm sm:toggle-md mr-2"
                          required
                        />
                        <span className="label-text text-xs sm:text-sm">
                          En cochant cette case, vous acceptez notre <br/>
                          <a href="#" className="font-semibold text-primary">
                            politique de confidentialité
                          </a>
                        </span>
                      </label>
                    </fieldset>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8 lg:mt-10">
                  <button
                    type="submit"
                    className="block w-full rounded-full bg-primary/50 px-3 sm:px-3.5 py-2 sm:py-2.5 text-center text-sm sm:text-base font-semibold text-base-content/70 hover:text-base-content shadow-xs hover:bg-primary focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
                  >
                    Envoyer le message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
