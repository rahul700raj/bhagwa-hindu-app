import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GiOmSymbol, GiLotusFlower } from 'react-icons/gi';
import { FaBook, FaTasks, FaTrophy } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaBook className="text-5xl" />,
      title: 'हिन्दू कहानियाँ',
      description: 'रामायण, महाभारत, पुराणों की कहानियाँ पढ़ें और साझा करें',
      link: '/stories',
      color: 'from-orange-400 to-red-500'
    },
    {
      icon: <FaTasks className="text-5xl" />,
      title: 'दैनिक कार्य',
      description: 'आध्यात्मिक कार्य पूरे करें और सिक्के कमाएं',
      link: '/tasks',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <GiLotusFlower className="text-5xl" />,
      title: 'हिन्दू ज्ञान',
      description: 'मंत्र, श्लोक, आरती, चालीसा और भजन',
      link: '/content',
      color: 'from-pink-400 to-purple-500'
    },
    {
      icon: <FaTrophy className="text-5xl" />,
      title: 'लीडरबोर्ड',
      description: 'अन्य उपयोगकर्ताओं के साथ प्रतिस्पर्धा करें',
      link: '/leaderboard',
      color: 'from-green-400 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block text-bhagwa-500 text-8xl mb-6"
        >
          <GiOmSymbol />
        </motion.div>
        
        <h1 className="text-6xl font-bold gradient-text mb-4 font-sanskrit">
          भगवा हिन्दू ऐप
        </h1>
        
        <p className="text-2xl text-gray-700 mb-8 font-hindi">
          हिन्दू धर्म, संस्कृति और आध्यात्मिकता का डिजिटल मंच
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-bhagwa text-xl px-8 py-4"
            >
              अभी शुरू करें
            </motion.button>
          </Link>
          <Link to="/stories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-bhagwa-500 border-2 border-bhagwa-500 text-xl px-8 py-4 rounded-lg font-semibold"
            >
              कहानियाँ देखें
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text font-hindi">
          मुख्य विशेषताएं
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link to={feature.link}>
                <div className={`bg-gradient-to-br ${feature.color} p-8 rounded-2xl shadow-xl text-white card-hover h-full`}>
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 font-hindi">{feature.title}</h3>
                  <p className="text-white/90 font-hindi">{feature.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-bhagwa-500 to-bhagwa-600 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-xl font-hindi">कहानियाँ</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-xl font-hindi">उपयोगकर्ता</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-xl font-hindi">दैनिक कार्य</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
