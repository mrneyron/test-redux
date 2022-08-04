import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Filter from "./components/Filter";
import Result from "./components/Result";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Filter />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
