import * as UI from "./components/UICompoents";
import HeroGeometric from "./components/HeroGeometric";
// import InfiniteScroll from "./components/infiniteSchroll"; 
import LetsWorkTogether from "./components/LetsWorkTogether";

function App() {
  return (
    <>
      <HeroGeometric />
      {/* <InfiniteScroll items={Array.from({ length: 10 }, (_, i) => i.toString())} /> */}
<LetsWorkTogether/>
      {/* <UI.HeroSection /> */}
      <UI.Objectif/> 
      {/* <UI.IdeasGrid /> */}
      <UI.Newsletter />
      <UI.Testimonials /> 
      <UI.Footer />
    </>
  );
}

export default App;
