import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import {useState} from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <BrowserRouter>
              <Routes>
                  <Route path="/" exact
                         element={<HomePage/>}
                  />
              </Routes>
          </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
