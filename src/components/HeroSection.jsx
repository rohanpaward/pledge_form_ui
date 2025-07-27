import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Leaf, Sparkles } from 'lucide-react';

const handleClick = () => {
  document.getElementById('pledge-form').scrollIntoView({ behavior: 'smooth' });
};

const HeroSection = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <section className="relative bg-green-100 py-24 text-center px-4 overflow-hidden">
      {/* Background animation */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute top-0 left-0 w-full h-full z-0"
        options={{
          fullScreen: false,
          particles: {
            number: { value: 60 },
            size: { value: 3 },
            color: { value: '#4ade80' },
            move: { enable: true, speed: 0.6 },
            opacity: { value: 0.5 },
            links: {
              enable: true,
              color: '#4ade80',
              distance: 100,
              opacity: 0.3,
            },
          },
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-center items-center gap-4 mb-4">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-green-600"
          >
            <Leaf size={36} />
          </motion.div>

          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-green-900">
            Join the Climate Action Pledge
          </h1>

          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-green-600"
          >
            <Sparkles size={32} />
          </motion.div>
        </div>

        <p className="text-lg mb-8 text-gray-700">
          Small steps by millions can change the world.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="bg-green-600 hover:shadow-lg hover:shadow-green-400/50 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Take the Pledge
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
