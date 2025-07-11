import * as UI from "./components/UICompoents";
import HeroGeometric from "./components/HeroGeometric";

function App() {
  return (
    <>
      <HeroGeometric />
      <UI.HeroSection />
      <UI.Objectif/> 
      {/* <UI.IdeasGrid /> */}
      <UI.Newsletter />
      <UI.Testimonials /> 
      <UI.Footer />
    </>
  );
}

export default App;
