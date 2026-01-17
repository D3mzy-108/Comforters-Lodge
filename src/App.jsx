import ScripturesPage from "./pages/Feed/Scriptures";
import Landing from "./pages/Landing";
import LessonPage from "./pages/Feed/Lesson";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <Route path="/scripture" element={<ScripturesPage />}></Route>
        <Route path="/lesson" element={<LessonPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
