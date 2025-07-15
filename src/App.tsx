import * as UI from "./components/UICompoents";
import HeroGeometric from "./components/HeroGeometric";
import InfiniteScroll from "./components/infiniteSchroll";

function App() {
  return (
    <>
      <HeroGeometric />
      <InfiniteScroll items={Array.from({ length: 10 }, (v, i) => i)} />
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
