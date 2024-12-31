import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './compontents/navbar';
import Analyse from './pages/analyse';
import Diary from './pages/diary';
import AllEntries from './pages/AllEntries';
import EntryDetails from './pages/EntryDetails';
import Home from './pages/home';

function App() {
  const [entries, setEntries] = useState([]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyse" element={<Analyse />} />
          <Route path="/diary" element={<Diary setEntries={setEntries} />} />
          <Route path="/entries" element={<AllEntries entries={entries} />} />
          <Route path="/entry/:id" element={<EntryDetails entries={entries} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
