function Demo() {
  return (
    <section className="bg-[#07101d] px-6 py-24 text-white">

      <div className="mx-auto max-w-6xl text-center">

        <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Demo
        </p>

        <h2 className="mt-4 text-4xl font-bold">
          See MediBridge in Action
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
          Watch how patients interact with MediBridge AI through WhatsApp and
          how authorized MediBridge healthcare professionals securely access
          reports through the Doctor Portal.
        </p>

        <div className="mt-14 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

          <video
            controls
            className="w-full"
            poster="/demo-thumbnail.png"
          >
            <source src="/demo.mp4" type="video/mp4" />
          </video>

        </div>

      </div>

    </section>
  );
}

export default Demo;