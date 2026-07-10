function Features() {
  const features = [
    {
      icon: "🤖",
      title: "AI Medical Analysis",
      description:
        "Receive AI-powered insights from reports, prescriptions, and symptoms within seconds.",
    },
    {
      icon: "📄",
      title: "Lab Report Analysis",
      description:
        "Understand blood tests and medical reports with simplified explanations.",
    },
    {
      icon: "💊",
      title: "Prescription Understanding",
      description:
        "Know what your prescribed medicines are for and how they support your treatment.",
    },
    {
      icon: "💬",
      title: "Symptom Assessment",
      description:
        "Describe your symptoms naturally through WhatsApp and receive intelligent guidance.",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description:
        "Your medical information is securely stored and only accessible to authorized MediBridge healthcare professionals.",
    },
    {
      icon: "👨‍⚕️",
      title: "Doctor Portal",
      description:
        "Authorized MediBridge doctors can securely review reports, patient history, and AI-generated insights.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-[#07101d] py-24 px-6 text-white"
    >
      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-cyan-400 font-semibold">
            Features
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            Everything You Need, All in One Place
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            MediBridge combines AI, WhatsApp, and secure healthcare workflows
            into one seamless experience.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-500/30"
            >

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-4xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;