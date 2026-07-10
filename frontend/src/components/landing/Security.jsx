import { ShieldCheck, Lock, UserCheck, Database } from "lucide-react";

function Security() {
  const securityPoints = [
    {
      icon: <Lock size={22} />,
      title: "Secure Data Storage",
      description:
        "Patient information is securely stored and protected throughout the healthcare journey.",
    },
    {
      icon: <UserCheck size={22} />,
      title: "Authorized Access",
      description:
        "Only authorized MediBridge healthcare professionals can access patient records.",
    },
    {
      icon: <Database size={22} />,
      title: "Protected Medical Records",
      description:
        "Medical reports and AI insights are securely managed for continuity of care.",
    },
  ];

  return (
    <section
      id="security"
      className="bg-[#020917] py-24 px-6 text-white"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

        {/* Left */}

        <div>

          <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Privacy & Security
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight">
            Your Health Data
            <br />
            Deserves Maximum Protection.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            At MediBridge AI, protecting your healthcare information is our
            priority. Every interaction is designed with privacy, security,
            and authorized access in mind.
          </p>

          <div className="mt-10 space-y-6">

            {securityPoints.map((item) => (

              <div
                key={item.title}
                className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  {item.icon}
                </div>

                <div>

                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-slate-400">
                    {item.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Right */}

        <div className="flex justify-center">

          <div className="flex h-[380px] w-[380px] items-center justify-center rounded-full bg-cyan-500/10">

            <div className="flex h-[280px] w-[280px] items-center justify-center rounded-full bg-cyan-500/10">

              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-cyan-500">

                <ShieldCheck
                  size={80}
                  className="text-[#020917]"
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Security;