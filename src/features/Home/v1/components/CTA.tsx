import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 text-center">
      <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        Ready to Transform Community Management?
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Join organizations using CommDesk to streamline collaboration, event
        management, and resource sharing.
      </p>

      <Link
        to="/features"
        className="inline-block px-8 py-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
      >
        Explore CommDesk
      </Link>
    </section>
  );
}