import { ChevronsUpDown } from "lucide-react";
import { formatNumber } from "../tools/tools";
import { useState } from "react";
import { motion } from "motion/react";

/**
 * permet de créer un indicateur de scroll
 *
 * @param {number} value - la valeur en percentage du scroll compris entre (0-100)
 * @param {Array<{title: string}>} links - tableau de liens ou ancre present dans le dom
 * @returns {JSX.Element} - l'element JSX de l'indicateur de scroll
 */

const ScrollIndicator = ({
  value = 1,
  links,
}: {
  value: number;
  links: Array<{ title: string }>;
}) => {
  const [showIndex, setShowIndex] = useState(false);

  const handleClick = () => {
    setShowIndex(!showIndex);
  };

  return (
    <motion.div
      initial={{ width: "15rem", height: "48px" }}
      animate={{ width: showIndex ? "17rem" : "10rem", height: showIndex ? "360px" : "48px"  }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="shadow-2xl fixed bottom-5 left-5 z-90 bg-base-200/80 backdrop-blur-sm border-1 border-base-200 p-3 transition-all rounded-3xl duration-200 overflow-hidden"
    >
      {/* {showIndex && ( */}
        <motion.div  
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-s px-2 py-2 mb-2  overflow-y-scroll">

          {links.map((link, index) => (
            <motion.div 
              className="pb-3 text-gray-400 hover:text-primary overflow-hidden min-w-6 whitespace-nowrap"
            >
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: showIndex ? 1 : 0, y: 0 , filter:  showIndex ? "blur(0)" : "blur(6px)" }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                className="text-ellipsis md:text-clipp  md:whitespace-nowrap"
              >
                <a key={index} href={`#${link.title}`}>
                  {formatNumber(index)}. {link.title}
                </a>
              </motion.div>
            </motion.div>
          ))}
          
        </motion.div>
      {/* )} */}
      <div className="flex justify-between absolute bottom-0  left-0 right-0 mb-3 mr-3 ml-2 ">
        <button
          className="flex text-gray-200 hover:text-gray-100 items-center gap-1 ml-2 justify-center"
          onClick={handleClick}
        >
          Index <ChevronsUpDown className="w-4 h-4" />
        </button>
        <div className="text-xs px-2 py-1 rounded-full bg-primary transition-all   duration-300 ">
          {value}%
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;
