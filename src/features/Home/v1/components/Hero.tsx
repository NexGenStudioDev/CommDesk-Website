import heroImg from '../../../../assets/hero.png';

export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 pt-8 pb-16 text-center">
      <img
        src={heroImg}
        alt="CommDesk Hero"
        className="mx-auto mb-6 w-64"
      />

      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
        The Modern Platform for Community Management
      </h1>
       
       <div className="flex justify-center">
  <p className="text-lg md:text-xl text-gray-400 mb-8 text-center leading-relaxed max-w-3xl">
    Manage communities, events, resources and collaboration from a single unified workspace.
  </p>
</div>

      <div className="flex justify-center items-center gap-4 mt-2">
        <button className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700">
          Get Started
        </button>

        <button className="px-6 py-3 rounded-lg border border-gray-600">
          Explore Features
        </button>
      </div>
    </section>
  );
}