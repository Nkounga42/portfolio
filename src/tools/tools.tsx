import type { Language } from "../libs/translations";

const formatNumber = (n: number): string => {
  if (n < 10) {
    return `0${n}`;
  }
  return n.toString();
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const CV_URLS: Record<Language, string> = {
  fr: "https://drive.google.com/file/d/1rO098ebH4xUFqw_ZPQbxhoeyvvNbo31c/view?usp=drive_link",
  en: "https://drive.google.com/file/d/1mdFJjqkH0PjqIJ6-YHWG5e7wE3-Q8g0v/view?usp=drive_link",
};

const handleDowload = (language: Language = "fr") => {
  window.open(CV_URLS[language], "_blank", "noopener,noreferrer");
};

const slugify = (text: string) => {
  return text
    .toString()
    .normalize('NFD')                    // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '')     // remove all the accents, which happen to be all in the \u03xx range 
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')                // Replace spaces with -
    .replace(/[^\w-]+/g, '')             // Remove all non-word chars
    .replace(/--+/g, '-');               // Replace multiple - with single -
};

export {
  formatNumber,
  scrollToTop,
  handleDowload,
  CV_URLS,
  slugify
}