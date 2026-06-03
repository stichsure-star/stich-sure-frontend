import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Designerspage from "./pages/Designerspage";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />


         
          <Route path="/designers" element={<Designerspage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
