import { Link } from "react-router-dom";
import { ShieldCheck, Landmark, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#0B1D3A] font-sans">
      {/* Nav */}
      <nav className="bg-[#0B1D3A] text-white">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Landmark className="w-6 h-6 text-[#C9A24B]" strokeWidth={1.75} />
            <span className="font-serif text-xl tracking-tight">Meridian Bank</span>
          </div>
          <Link to="/login" className="text-sm border border-white/30 rounded-full px-4 py-1.5 hover:bg-white/10 transition">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-[#0B1D3A] text-white"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 40px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 pt-16 pb-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[#C9A24B] text-sm tracking-[0.2em] uppercase mb-4">
              Personal Banking, Reimagined
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-5">
              Your money, moving with intention.
            </h1>
            <p className="text-white/70 max-w-md mb-8 leading-relaxed">
              Meridian keeps your balance, your history, and your next move in
              one clear view — no clutter, no guesswork.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-[#C9A24B] text-[#0B1D3A] font-medium rounded-full px-6 py-3 hover:bg-[#dab55f] transition">
              Open an account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://picsum.photos/seed/meridian-hero/640/480"
              alt="Person reviewing finances on a laptop"
              className="rounded-2xl w-full h-72 sm:h-96 object-cover shadow-2xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-white text-[#0B1D3A] rounded-xl px-4 py-3 shadow-lg hidden sm:block">
              <p className="text-xs text-[#0B1D3A]/60">Total Balance</p>
              <p className="font-serif text-lg">$4,218.60</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust checklist band */}
      <section className="bg-[#132A52] text-white">
        <div className="max-w-6xl mx-auto px-5 py-6 grid sm:grid-cols-3 gap-4">
          {[
            "No minimum balance, ever",
            "Every account, one clear ledger",
            "Bank-level encryption on every login",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
              <span className="text-sm text-white/90">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="font-serif text-2xl mb-1">What Meridian handles for you</h2>
        <p className="text-[#0B1D3A]/60 mb-10">
          Three tools, one login, zero friction.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: Landmark,
              title: "Everyday Checking",
              desc: "A single account for spending and receiving, with a live running balance.",
              img: "checking",
            },
            {
              icon: TrendingUp,
              title: "Savings, Visualized",
              desc: "Watch your balance trend over time instead of guessing from statements.",
              img: "savings",
            },
            {
              icon: ShieldCheck,
              title: "Account Security",
              desc: "Every sign-in and transaction is logged and confirmed, end to end.",
              img: "security",
            },
          ].map(({ icon: Icon, title, desc, img }) => (
            <div key={title} className="border border-[#0B1D3A]/10 rounded-xl overflow-hidden bg-white hover:shadow-md transition">
              <img
                src={`https://picsum.photos/seed/meridian-${img}/400/220`}
                alt=""
                className="w-full h-36 object-cover"
              />
              <div className="p-6">
                <Icon className="w-6 h-6 text-[#C9A24B] mb-4" strokeWidth={1.75} />
                <h3 className="font-serif text-lg mb-2">{title}</h3>
                <p className="text-sm text-[#0B1D3A]/65 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1D3A] text-white/50 text-xs py-6">
        <div className="max-w-6xl mx-auto px-5">
          Meridian Bank is a fictional portfolio project. Not a real financial institution.
        </div>
      </footer>
    </div>
  );
}
