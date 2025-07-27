/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Globe, Leaf, Sparkles } from 'lucide-react';

const WhySection = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20 px-6 text-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-green-300 opacity-30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-400 opacity-30 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-green-800 mb-6"
      >
        Why Take Climate Action?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg max-w-2xl mx-auto text-gray-700 mb-12"
      >
        Every action, no matter how small, creates ripples. When millions unite for climate action, we
        create a wave of change. Your pledge matters.
      </motion.p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        {[{ icon: <Leaf />, label: 'Sustainable Living' }, { icon: <Globe />, label: 'Global Impact' }, { icon: <Sparkles />, label: 'Inspire Others' }].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 text-3xl text-green-600 mb-2">{item.icon}</div>
            <p className="text-md font-medium text-gray-800">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
