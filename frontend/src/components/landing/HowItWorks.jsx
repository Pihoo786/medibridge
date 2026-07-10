function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Chat on WhatsApp",
      description:
        "Send your medical report, prescription, or describe your symptoms directly through WhatsApp.",
      icon: "💬",
    },
    {
      number: "02",
      title: "AI Analysis",
      description:
        "MediBridge AI analyzes your medical information and generates easy-to-understand insights.",
      icon: "🤖",
    },
    {
      number: "03",
      title: "Professional Review",
      description:
        "Authorized MediBridge healthcare professionals securely review your reports through the Doctor Portal.",
      icon: "👨‍⚕️",
    },
    {
      number: "04",
      title: "Healthcare Support",
      description:
        "Receive organized healthcare insights and continue your care with confidence.",
      icon: "❤️",
    },
  ];

  return (
    <section className="bg-[#020917] py-24 px-6 text-white">

      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-cyan-400 font-semibold">
            How It Works
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            Your Healthcare Journey in 4 Simple Steps
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-400">
            MediBridge AI makes healthcare simple by combining WhatsApp,
            Artificial Intelligence, and secure professional review.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {steps.map((step) => (

            <div
              key={step.number}
              className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-8 hover:border-cyan-500/30 transition duration-300 hover:-translate-y-2"
            >

              <span className="absolute right-6 top-6 text-sm font-bold text-slate-600">
                {step.number}
              </span>

              <div className="text-5xl">
                {step.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;