import Feed from "./pages/Feed";
import Landing from "./pages/Landing";
import { Routes, Route } from "react-router-dom";
import FeedPost from "./pages/FeedPost";

const App = () => {
  return (
    <>
      <Routes path="/pages">
        <Route path="/" element={<Landing />} />
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/lesson" element={<FeedPost />}></Route>
      </Routes>
    </>
  );
};

export default App;
