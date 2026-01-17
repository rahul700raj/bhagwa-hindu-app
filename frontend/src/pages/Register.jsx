import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { GiOmSymbol } from 'react-icons/gi';
import { toast } from 'react-toastify';
import api from '../utils/api';
import useAuthStore from '../store/authStore';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await api.post('/auth/register', formData);
      setUser(data.data, data.data.token);
      toast.success('रजिस्ट्रेशन सफल! 🎉');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'रजिस्ट्रेशन विफल');
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
          <h2 className="text-3xl font-bold gradient-text font-hindi">रजिस्टर करें</h2>
          <p className="text-gray-600 mt-2 font-hindi">नया खाता बनाएं</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 font-hindi">नाम</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-bhagwa-500 focus:outline-none"
              placeholder="आपका नाम"
            />
          </div>

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
            <label className="block text-gray-700 font-semibold mb-2 font-hindi">फोन</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-bhagwa-500 focus:outline-none"
              placeholder="9876543210"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 font-hindi">पासवर्ड</label>
            <input
              type="password"
              required
              minLength={6}
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
            {loading ? 'रजिस्टर हो रहा है...' : 'रजिस्टर करें'}
          </motion.button>
        </form>

        <p className="text-center mt-6 text-gray-600 font-hindi">
          पहले से खाता है?{' '}
          <Link to="/login" className="text-bhagwa-500 font-semibold hover:underline">
            लॉगिन करें
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
