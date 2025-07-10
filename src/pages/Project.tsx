 
const images = [
  "https://i.pinimg.com/736x/84/fe/01/84fe017678e0801a1d03a06f0d83bc76.jpg",
  "https://i.pinimg.com/736x/72/d2/d7/72d2d7d4c0a3f7baeae647d3f44a5476.jpg",
  "https://i.pinimg.com/736x/21/7e/be/217ebe78850843de2d4565102117a509.jpg",
  "https://i.pinimg.com/736x/a7/c6/8f/a7c68fb790f692ea25d86343529c4dd3.jpg",
  "https://i.pinimg.com/736x/3e/fe/ad/3efeadb61d5e07a56f7f6e8d3e6fd3e9.jpg",
  "https://i.pinimg.com/736x/94/44/d6/9444d6152ee921c58a78ead3725e5c11.jpg",
  "https://i.pinimg.com/736x/d8/21/e3/d821e3d89d437a298e53a78497107c16.jpg",
  "https://i.pinimg.com/736x/5e/ab/83/5eab83fe882e84d907040cfd1f1485c1.jpg",
];

export default function Projet() {
  return (
    <div className=" min-h-screen text-white p-6 flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full">
        

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Investment and incubation partner for Muslim leaders building impactful companies in emerging tech.
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {images.map((src, index) => (
            <div key={index} className="rounded overflow-hidden">
              <img src= {src}  alt={`img-${index}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="bg-orange-500 text-white p-4 rounded flex flex-col justify-between">
            <div className="font-bold">APPLY TO JOIN ALIF</div>
            <div className="text-sm">Applications are open until 20th Feb. Join.</div>
          </div>
        </div>

         
      </div>
    </div>
  );
}
