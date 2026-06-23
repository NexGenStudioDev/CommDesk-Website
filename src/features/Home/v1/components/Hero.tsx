import { Link } from 'react-router-dom';
import heroImg from '../../../../assets/hero.png';

export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 pt-24 pb-16 text-center relative z-0">
      <img src={heroImg} alt="CommDesk Hero" className="mx-auto mb-6 w-64" />

      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        The Modern Platform for Community Management
      </h1>

      <div className="flex justify-center">
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 text-center leading-relaxed max-w-3xl">
          Manage communities, events, resources and collaboration from a single
          unified workspace.
        </p>
      </div>

      <div className="flex justify-center items-center gap-4 mt-2">
        <Link
          to="/signup"
          className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
        >
          Get Started
        </Link>

        <Link
          to="/features"
          className="px-6 py-3 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Explore Features
        </Link>
      </div>
    </section>
  );
}