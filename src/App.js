import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddWidgetPage from './components/AddWidgetPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-widget" element={<AddWidgetPage />} />
        <Route path='/cancel-widget' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
