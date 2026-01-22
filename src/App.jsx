import ScripturesPage from "./pages/Feed/Scriptures";
import Landing from "./pages/Landing";
import LessonPage from "./pages/Feed/Lesson";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "./pages/About/About";
import Declaration from "./pages/About/Declaration";
import HymnsPage from "./pages/Hymns/Hymns";

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
  const routes = [
    { path: "/", element: <Landing /> },
    { path: "/about", element: <About /> },
    { path: "/declaration", element: <Declaration /> },
    { path: "/lesson", element: <LessonPage /> },
    { path: "/scripture", element: <ScripturesPage /> },
    { path: "/hymns", element: <HymnsPage /> },
  ];
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
