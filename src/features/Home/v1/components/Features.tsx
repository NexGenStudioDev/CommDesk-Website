export default function Features() {
  const features = [
    {
      title: 'Communities',
      desc: 'Build and manage thriving communities.',
    },
    {
      title: 'Events',
      desc: 'Organize and engage members through events.',
    },
    {
      title: 'Resources',
      desc: 'Share documents and knowledge efficiently.',
    },
    {
      title: 'Collaboration',
      desc: 'Work together in one unified platform.',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-8">
        Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-[#14192c] rounded-xl p-6 hover:bg-[#1c2240] transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-400">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}