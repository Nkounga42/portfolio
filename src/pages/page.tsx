
const HeroSection = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center px-8 py-12">
      {/* Partie gauche */}
      <div className="md:w-1/2 w-full space-y-6 text-center md:text-left   ">
        <h1 className="text-4xl font-bold">First, claim your unique link</h1>
        <p className="text-gray-500 text-lg">The good ones are still available!</p>

        <div className="form-control w-full max-w-md mx-auto md:mx-0">
          <label className="input input-bordered flex items-center gap-2 text-gray-500">
            <span className="text-gray-400">bento.me/</span>
            <input
              type="text"
              className="grow bg-transparent focus:outline-none"
              placeholder="your-name"
            />
          </label>
        </div>

        <p className="text-sm text-gray-400 mt-2">or <a className="underline cursor-pointer">log in</a></p>
      </div>

      {/* Partie droite */}
      <div className="md:w-1/2 w-full mt-12 md:mt-0 flex justify-center">
        <div className="grid grid-cols-2 gap-4">
          {/* Exemples de blocs — ici on utilise des placeholders */}
          <div className="bg-base-100 shadow-xl rounded-xl p-4 w-32 h-32 flex items-center justify-center">
            <img src="https://via.placeholder.com/60" alt="placeholder" />
          </div>
          <div className="bg-base-200 shadow-xl rounded-xl p-4 w-32 h-32 flex items-center justify-center">
            <img src="https://via.placeholder.com/60" alt="placeholder" />
          </div>
          <div className="bg-base-300 shadow-xl rounded-xl p-4 w-32 h-32 flex items-center justify-center">
            <img src="https://via.placeholder.com/60" alt="placeholder" />
          </div>
          <div className="bg-base-100 shadow-xl rounded-xl p-4 w-32 h-32 flex items-center justify-center">
            <img src="https://via.placeholder.com/60" alt="placeholder" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
