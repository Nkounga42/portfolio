import { Lightbulb } from 'lucide-react';
import IdeasCard from './IdeasCard';


const IdeasGrid = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-5 ">
      <div className="text-center mb-12 flex flex-col items-center gap-5">
        <Lightbulb className="h-10 w-10 " />

        <h1 className="text-3xl font-semibold">Gather your ideas</h1>
        <p className="text-gray-600 mt-2 max-w-md">
          Save whatever you like—gather thoughts, links, images, files, or anything else that comes to mind.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         
          <IdeasCard  
            link="./"
            imgsrc=
            "https://i.pinimg.com/736x/31/94/85/319485d3064cab88f84c2cbedd720139.jpg"
          > 
          </IdeasCard>
          <IdeasCard  
            link="./"
            imgsrc=
            "https://i.pinimg.com/736x/31/94/85/319485d3064cab88f84c2cbedd720139.jpg"
          > 
          </IdeasCard>
          <IdeasCard  
            link="./"
            imgsrc=
            "https://i.pinimg.com/736x/31/94/85/319485d3064cab88f84c2cbedd720139.jpg"
          > 
          </IdeasCard>
          <IdeasCard  
            link="./"
            imgsrc=
            "https://i.pinimg.com/736x/31/94/85/319485d3064cab88f84c2cbedd720139.jpg"
          > 
          </IdeasCard>
      </div>
    </div>
  );
};

export default IdeasGrid;