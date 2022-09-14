import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { light, dark } from './context/Theme';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PageNoFound from './pages/PageNoFound';
import ToggleTheme from './components/ToggleTheme';
import { AppProvider } from './context/context';
import Protected from './Protected';
import './App.css';
function App() {
  const [theme, setTheme] = useState('light');
  const changeTheme = () => {
    setTheme((preState) => {
      if (preState === 'light') return 'dark';
      return 'light';
    });
  };

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <AppProvider>
        <GlobalStyles />
        <ToggleTheme handle={changeTheme} theme={theme} />
        <Router>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route
              path="dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route
              path="/"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route path="*" element={<PageNoFound />} />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
