import Landing from "./pages/Landing";
import Today from "./pages/Today";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes path="/pages">
        <Route path="/" element={<Landing />} />
        <Route path="/devotionals" element={<Today />}></Route>
      </Routes>
    </>
  );
};

export default App;
