// src/App.jsx

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation.jsx';
import Home from './pages/Home.jsx';
import TechnologyList from './pages/TechnologyList.jsx';
import TechnologyDetail from './pages/TechnologyDetail.jsx';
import AddTechnology from './pages/AddTechnology.jsx';
import Statistics from './pages/Statistics.jsx'; 
import Settings from './pages/Settings.jsx';
import GeniusSearch from './pages/GeniusSearch.jsx';

import useTechnologies from './hooks/useTechnologies'; 

function App() {
  // Инициализируем данные при первом рендере
  useTechnologies();

  return (
    <Router basename="/study-app"> 
      <div className="App">
        <Navigation /> 
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/technology/:techId" element={<TechnologyDetail />} />
            <Route path="/add-technology" element={<AddTechnology />} />
            <Route path="/statistics" element={<Statistics />} /> 
            <Route path="/genius" element={<GeniusSearch />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <div className="footer-stats">
            <p>Трекер изучения технологий.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;