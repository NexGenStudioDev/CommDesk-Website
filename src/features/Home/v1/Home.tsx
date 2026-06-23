import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import WhyCommDesk from './components/WhyCommDesk';
import CTA from './components/CTA';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0f1f] text-gray-900 dark:text-white pt-[72px]">
      <Hero />
      <Stats />
      <Features />
      <WhyCommDesk />
      <CTA />
    </main>
  );
}