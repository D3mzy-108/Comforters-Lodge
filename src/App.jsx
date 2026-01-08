import Feed from "./pages/Feed";
import Landing from "./pages/Landing";
import FeedPost from "./pages/FeedPost";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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
      <Routes path="/pages">
        <Route path="/" element={<Landing />} />
        <Route path="/scripture" element={<Feed />}></Route>
        <Route path="/lesson" element={<FeedPost />}></Route>
      </Routes>
    </>
  );
};

export default App;
