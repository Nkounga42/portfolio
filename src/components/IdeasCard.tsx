import { ArrowRight } from "lucide-react" 
const IdeasCard = (
  {
    title = "Gather your ideas", 
    description ="Provident cupiditate voluptatem et in. Quaerat fugiat assumenda  ", 
    link = "#",  
    imgsrc = "URL_ADDRESS.86L9h/pexels-anna-shvets-5388184.jpg"
  }:{
    title?: string; 
    description?: string; 
    link?: string;  
    imgsrc?: string;
  }) => {

  return (
    <div
    
    className="relative bg-base-300 rounded-3xl p-2 overflow-hidden shadow-2xl">
      <div className=" absolute top-0 left-0 bottom-0 pointer-events-none blur-overlay bg-gradient-to-t from-transparent to-base-200  p-8">
        <h3 className="text-gray-300 max-w-md flex items-center gap-2">
          {title}
        </h3>
        <h4 className="max-w-[400px] text-xl mt-4 font-medium">
          {description} 
        </h4>  
      </div>
      <img src={imgsrc} alt={imgsrc}  className=" h-[300px] w-[225px] rounded-2xl " />
      {link && (<a href={link}>
        <ArrowRight className="badge z-1 rounded-full absolute h-10 w-10 bottom-0 right-0 m-4" />
      </a>)}
    </div>

  )
}

export default IdeasCard