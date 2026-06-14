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

export {
  formatNumber,
  scrollToTop,
  handleDowload,
  CV_URLS,
}