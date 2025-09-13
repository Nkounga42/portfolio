const formatNumber = (n: number): string => {
  if (n < 10) {
    return `0${n}`;
  }
  return n.toString();
}
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export {
  formatNumber,
  scrollToTop
}