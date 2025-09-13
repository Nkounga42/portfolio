const formatNumber = (n: number): string => {
  if (n < 10) {
    return `0${n}`;
  }
  return n.toString();
}
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const handleDowload = () => {
  window.location.href = "https://drive.google.com/file/d/16gRaEVVXpH_kSEK1x3MISM-og4zXeGza/view?usp=sharing";
}
export {
  formatNumber,
  scrollToTop,
  handleDowload
}