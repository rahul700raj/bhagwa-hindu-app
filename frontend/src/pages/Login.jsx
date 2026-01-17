import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { GiOmSymbol } from 'react-icons/gi';
import { toast } from 'react-toastify';
import api from '../utils/api';
import useAuthStore from '../store/authStore';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await api.post('/auth/login', formData);
      setUser(data.data, data.data.token);
      toast.success('लॉगिन सफल! 🙏');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'लॉगिन विफल');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block text-bhagwa-500 text-6xl mb-4"
          >
            <GiOmSymbol />
          </motion.div>
          <h2 className="text-3xl font-bold gradient-text font-hindi">लॉगिन करें</h2>
          <p className="text-gray-600 mt-2 font-hindi">अपने खाते में प्रवेश करें</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 font-hindi">ईमेल</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-bhagwa-500 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 font-hindi">पासवर्ड</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-bhagwa-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full btn-bhagwa text-lg py-3 disabled:opacity-50"
          >
            {loading ? 'लॉगिन हो रहा है...' : 'लॉगिन करें'}
          </motion.button>
        </form>

        <p className="text-center mt-6 text-gray-600 font-hindi">
          खाता नहीं है?{' '}
          <Link to="/register" className="text-bhagwa-500 font-semibold hover:underline">
            रजिस्टर करें
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
