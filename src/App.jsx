import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useThemeMode } from './hooks/useThemeMode';
import NotificationProvider from './components/useNotification.jsx';
import Navigation from './components/Navigation.jsx';
import Home from './pages/Home.jsx';
import TechnologyList from './pages/TechnologyList.jsx';
import TechnologyDetail from './pages/TechnologyDetail.jsx';
import AddTechnology from './pages/AddTechnology.jsx';
import Statistics from './pages/Statistics.jsx'; 
import Settings from './pages/Settings.jsx';
import GeniusSearch from './pages/GeniusSearch.jsx';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import useTechnologies from './hooks/useTechnologies'; 

function App() {
  useTechnologies();
  const { theme, toggleColorMode, mode } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
            <Router basename="/study-app"> 
                <div className="App">
                    <Navigation toggleTheme={toggleColorMode} currentMode={mode} />
                    
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/technologies" element={<TechnologyList />} />
                            <Route path="/technology/:techId" element={<TechnologyDetail />} />
                            <Route path="/add-technology" element={<AddTechnology />} />
                            <Route path="/statistics" element={<Statistics />} /> 
                            <Route path="/genius" element={<GeniusSearch />} />

                            <Route element={<ProtectedRoute />}>
                                <Route path="/settings" element={<Settings />} />
                            </Route>
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </main>
                    
                    <footer className="app-footer">
                        <div className="footer-stats">
                            <p>Трекер изучения технологий.</p>
                        </div>
                    </footer>
                </div>
            </Router>
        </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;