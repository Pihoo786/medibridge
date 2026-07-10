function WhyMediBridge() {
  const cards = [
    {
      icon: "📄",
      title: "Understand Medical Reports",
      description:
        "Upload your lab reports and receive simplified AI-powered explanations that are easy to understand.",
    },
    {
      icon: "💊",
      title: "Decode Prescriptions",
      description:
        "Understand medicines and important prescription details without confusing medical jargon.",
    },
    {
      icon: "💬",
      title: "Describe Your Symptoms",
      description:
        "Simply chat on WhatsApp and let MediBridge AI assist you with your health concerns.",
    },
  ];

  return (
    <section
      id="about"
      className="bg-[#020917] px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <p className="text-cyan-400 font-semibold uppercase tracking-[0.3em]">
            Why MediBridge
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            Healthcare Made Simple.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            Healthcare shouldn't be difficult to understand. MediBridge AI
            combines the convenience of WhatsApp with artificial intelligence
            to make healthcare more accessible.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {cards.map((card) => (

            <div
              key={card.title}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-500/30"
            >

              <div className="text-5xl">
                {card.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {card.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {card.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyMediBridge;