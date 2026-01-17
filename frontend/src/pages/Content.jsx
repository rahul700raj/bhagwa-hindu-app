import React from 'react';
import { motion } from 'framer-motion';
import { GiLotusFlower } from 'react-icons/gi';

const Content = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <GiLotusFlower className="text-6xl text-bhagwa-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold gradient-text mb-4 font-hindi">हिन्दू ज्ञान</h1>
        <p className="text-xl text-gray-600 font-hindi">जल्द ही आ रहा है...</p>
      </motion.div>
    </div>
  );
};

export default Content;
