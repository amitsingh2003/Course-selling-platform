import React from "react";
import Home from "./home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Courses from "./assets/Courses/Courses";
import SignUP from "./component/SignUP";

import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/Authprovider";
import Contact from "./component/Contact";
import About from "./component/About";

function App() {
  const [authUser, setAuthUser] = useAuth();

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Protect the Courses route */}
          <Route
            path="/Course"
            element={authUser ? <Courses /> : <Navigate to="/SignUp" />}
          />
          <Route path="/SignUp" element={<SignUP />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
