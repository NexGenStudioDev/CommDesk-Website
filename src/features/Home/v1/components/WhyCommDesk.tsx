export default function WhyCommDesk() {
  const reasons = [
    'Modern Interface',
    'Easy Community Management',
    'Event Organization',
    'Resource Sharing',
    'Responsive Design',
    'Scalable Architecture',
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-8">
        Why CommDesk?
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {reasons.map((reason) => (
          <div
            key={reason}
            className="bg-[#14192c] rounded-xl p-5 text-center"
          >
            ✓ {reason}
          </div>
        ))}
      </div>
    </section>
  );
}