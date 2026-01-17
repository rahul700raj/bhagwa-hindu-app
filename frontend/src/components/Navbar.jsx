import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaBook, FaTasks, FaUser, FaTrophy, FaCoins, FaBars, FaTimes } from 'react-icons/fa';
import { GiOmSymbol, GiLotusFlower } from 'react-icons/gi';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'होम', path: '/', icon: <FaHome /> },
    { name: 'कहानियाँ', path: '/stories', icon: <FaBook /> },
    { name: 'कार्य', path: '/tasks', icon: <FaTasks /> },
    { name: 'ज्ञान', path: '/content', icon: <GiLotusFlower /> },
    { name: 'लीडरबोर्ड', path: '/leaderboard', icon: <FaTrophy /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-bhagwa-500 to-bhagwa-600 shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-white text-3xl"
            >
              <GiOmSymbol />
            </motion.div>
            <span className="text-white font-bold text-2xl font-sanskrit">
              भगवा हिन्दू
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="text-white hover:text-om-light transition-colors flex items-center space-x-2 font-hindi"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full"
                >
                  <FaCoins className="text-yellow-300" />
                  <span className="text-white font-bold">{user.coins}</span>
                </motion.div>
                <Link to="/profile">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-white text-bhagwa-500 px-4 py-2 rounded-full font-semibold"
                  >
                    <FaUser />
                    <span>{user.name}</span>
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold"
                >
                  लॉगआउट
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-white text-bhagwa-500 px-6 py-2 rounded-full font-semibold"
                  >
                    लॉगिन
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-bhagwa-700 text-white px-6 py-2 rounded-full font-semibold"
                  >
                    रजिस्टर
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block text-white hover:bg-white/20 px-4 py-3 rounded-lg mb-2 flex items-center space-x-2"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
            {user ? (
              <>
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-3 rounded-lg mb-2">
                  <FaCoins className="text-yellow-300" />
                  <span className="text-white font-bold">{user.coins} सिक्के</span>
                </div>
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-white text-bhagwa-500 px-4 py-3 rounded-lg mb-2 font-semibold">
                    प्रोफाइल
                  </button>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full bg-red-500 text-white px-4 py-3 rounded-lg font-semibold"
                >
                  लॉगआउट
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-white text-bhagwa-500 px-4 py-3 rounded-lg mb-2 font-semibold">
                    लॉगिन
                  </button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-bhagwa-700 text-white px-4 py-3 rounded-lg font-semibold">
                    रजिस्टर
                  </button>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
