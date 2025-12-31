import Feed from "./pages/Feed";
import Landing from "./pages/Landing";
import Today from "./pages/Today";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes path="/pages">
        <Route path="/" element={<Landing />} />
        <Route path="/pages/Today" element={<Today />}></Route>
        <Route path="/pages/Feed" element={<Feed />}></Route>
        <Route path="/devotionals" element={<Today />}></Route>
      </Routes>
    </>
  );
};

export default App;
