import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Reservations from './pages/Reservations';
import OrderOnline from './pages/OrderOnline';
import LuckyWheel from './pages/LuckyWheel';
import AIAssistant from './pages/AIAssistant';
import Billing from './pages/Billing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="about" element={<About />} />
            <Route path="billing" element={<Billing />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="order-online" element={<OrderOnline />} />
            <Route path="lucky-wheel" element={<LuckyWheel />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;
