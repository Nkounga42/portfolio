import React from "react";
import { Link } from 'lucide-react';
interface ParagraphProps {
  title: string;
  children: React.ReactNode;
  paragrapheType?: string;
  link?: string;
  index?: string;
}
/**
 * Un composant qui affiche un paragraphe avec un titre et un lien optionnel
 * @param {string} title - Le texte du titre à afficher
 * @param {React.ReactNode} children - Le contenu du paragraphe
 * @param {string} [paragrapheType="h2"] - L'élément HTML de titre à utiliser
 * @param {string} [link] - ID du lien d'ancrage optionnel
 * @param {string} [index] - Numéro/index optionnel à ajouter avant le titre
 * @returns {JSX.Element} Composant Paragraphe avec titre et contenu
*/
const Paragraph: React.FC<ParagraphProps> = ({
  title,
  children,
  link,
  index,
  paragrapheType = "h2",
}) => {
  return (
    <div className="my-12 ">
      <div className="group">
        <a href={`#${ link }`}></a>
        <Link className="absolute left-[-30px] top-1 h-5 w-5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
        {paragrapheType && React.createElement(paragrapheType, {
          className: 'text-2xl font-bold mb-4 ',
          id: title
        }, (index && `${ index}. `) + title)}
      </div>
      <p className={`text-base leading-relaxed text-gray-300`}>{children}</p>
    </div>
  );
};

export default Paragraph;
