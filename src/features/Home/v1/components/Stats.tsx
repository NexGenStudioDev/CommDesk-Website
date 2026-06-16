export default function Stats() {
  const stats = [
    {
      icon: '👥',
      title: 'Community Driven',
    },
    {
      icon: '📅',
      title: 'Event Management',
    },
    {
      icon: '📚',
      title: 'Resource Sharing',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-[#14192c] rounded-xl p-6 text-center"
          >
            <div className="text-3xl mb-3">
              {item.icon}
            </div>

            <h3 className="font-semibold">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}