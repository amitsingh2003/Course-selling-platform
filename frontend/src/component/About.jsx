import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import About_mat from "./About_mat";
import Nav from './Nav'
import Footer from './Footer'

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
    <Nav></Nav>
      <About_mat></About_mat>
      <Footer></Footer>
    </>
  );
};

export default AboutUs;
