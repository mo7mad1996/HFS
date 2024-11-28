import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import About from "../Components/About";
import OurFocus from "../Components/OurFocus";
import OurStory from "../Components/OurStory";
import PeaceOfArts from "../Components/PeaceOfArts";
import SocietyProducts from "../Components/SocietyProducts";
import HfsSociety from "../Components/HfsSociety";
import FloatingCallButton from "../Components/FloatingCallButton";
import Subscriptions from "../Components/Subscriptions";

function Home() {
  return (
    <Box>
      <Navbar />
      <About />
      <OurFocus />
      <OurStory />
      <PeaceOfArts />
      <SocietyProducts />
      <HfsSociety />
      <Subscriptions />
      <FloatingCallButton />
    </Box>
  );
}

export default Home;
