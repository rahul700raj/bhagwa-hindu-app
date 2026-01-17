import React from 'react';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';
import useAuthStore from '../store/authStore';

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <FaUser className="text-6xl text-bhagwa-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold gradient-text font-hindi">{user?.name}</h1>
          <p className="text-gray-600 mt-2">{user?.email}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-xl text-white">
            <div className="text-4xl font-bold">{user?.coins || 0}</div>
            <div className="font-hindi">सिक्के</div>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-blue-500 p-6 rounded-xl text-white">
            <div className="text-4xl font-bold">{user?.level || 1}</div>
            <div className="font-hindi">स्तर</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
