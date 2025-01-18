import React from "react";
import Nav from "../component/Nav";
import Banner from "../component/Banner";
import Course from "../component/Course";
import Footer from "../component/Footer";

function Home() {
  return (
    <>
      <Nav></Nav>
      <Banner></Banner>

      <Course></Course>

      <Footer></Footer>
    </>
  );
}

export default Home;
