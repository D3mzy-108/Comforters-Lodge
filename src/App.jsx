import ScripturesPage from "./pages/Feed/Scriptures";
import Landing from "./pages/Landing";
import LessonPage from "./pages/Feed/Lesson";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "./pages/About/About";
import Declaration from "./pages/About/Declaration";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Routes path="/pages">
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />}></Route>
        <Route path="/declaration" element={<Declaration />}></Route>
        <Route path="/lesson" element={<LessonPage />}></Route>
        <Route path="/scripture" element={<ScripturesPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
