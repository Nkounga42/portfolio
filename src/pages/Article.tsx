import * as UI from '../components/UICompoents'
import { useEffect, useState } from 'react';
import { formatNumber } from '../tools/tools'; 

const articles = [
  {
    title: "Les bienfaits du café",
    text: "Le café est une boisson appréciée dans le monde entier pour ses effets stimulants et ses arômes riches."
  },
  {
    title: "L'importance du sommeil", 
    text: "Dormir suffisamment chaque nuit est crucial pour la santé mentale et physique."
  },
  {
    title: "Apprendre à coder",
    text: "La programmation est une compétence de plus en plus recherchée dans le monde professionnel."
  },
  {
    title: "Voy ager en Europe",
    text: "L'Europe offre une grande variété de cultures, de paysages et de cuisines à découvrir."
  },
  {
    title: "Les bienfaits du café",
    text: "Le café est une boisson appréciée dans le monde entier pour ses effets stimulants et ses arômes riches."
  },
  {
    title: "mportance du sommeil", 
    text: "Dormir suffisamment chaque nuit est crucial pour la santé mentale et physique."
  },
  {
    title: "Appr  oder",
    text: "La programmation est une compétence de plus en plus recherchée dans le monde professionnel."
  },
  {
    title: "Voyag er en Europe",
    text: "L'Europe offre une grande variété de cultures, de paysages et de cuisines à découvrir."
  }
];

const Article = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      setContentHeight(documentHeight);
      setIsScrollable(documentHeight > windowHeight && contentHeight > windowHeight);
      
      if (documentHeight > windowHeight) {
        const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;
        setScrollPercentage(Math.min(scrolled, 100));
      } else {
        setScrollPercentage(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    // Initial check
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    }
  }, [contentHeight]);

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='max-w-4xl mx-auto   h-screen'>
        {articles.map((article, index) => (
          <UI.Paragraph title={article.title} index={formatNumber(index)} key={index} >
            {article.text}
          </UI.Paragraph>
        ))}
        {isScrollable && <UI.ScrollIndicator value={Math.round(scrollPercentage)} links={articles} />}
      </div>
    </div>
  );
};

export default Article 
