import { Link } from "react-router-dom";

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#C9A24B] shrink-0">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
    <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LandmarkIcon = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 10l9-6 9 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 10v9M20 10v9M8 10v9M16 10v9M2 21h20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);
const TrendIcon = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 17l6-6 4 4 8-8M15 7h6v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ShieldIcon = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#0B1D3A] font-sans">
      <nav className="bg-[#0B1D3A] text-white">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LandmarkIcon className="w-6 h-6 text-[#C9A24B]" />
            <span className="font-serif text-xl tracking-tight">Meridian Bank</span>
          </div>
          <Link to="/login" className="text-sm border border-white/30 rounded-full px-4 py-1.5 hover:bg-white/10 transition">
            Sign In
          </Link>
        </div>
      </nav>

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
              Open an account <ArrowIcon />
            </Link>
          </div>
          <div className="relative">
            <div className="rounded-2xl w-full h-72 sm:h-96 shadow-2xl bg-gradient-to-br from-[#1c3b6e] to-[#0B1D3A] flex items-center justify-center">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="text-white/25">
                <path d="M12 2L2 7v2h20V7L12 2z" fill="currentColor" />
                <path d="M4 10v9h2v-9H4zm5 0v9h2v-9H9zm5 0v9h2v-9h-2zm5 0v9h2v-9h-2z" fill="currentColor" />
                <path d="M2 21h20v2H2z" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-[#0B1D3A] rounded-xl px-4 py-3 shadow-lg hidden sm:block">
              <p className="text-xs text-[#0B1D3A]/60">Total Balance</p>
              <p className="font-serif text-lg">$4,218.60</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#132A52] text-white">
        <div className="max-w-6xl mx-auto px-5 py-6 grid sm:grid-cols-3 gap-4">
          {[
            "No minimum balance, ever",
            "Every account, one clear ledger",
            "Bank-level encryption on every login",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <CheckIcon />
              <span className="text-sm text-white/90">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="font-serif text-2xl mb-1">What Meridian handles for you</h2>
        <p className="text-[#0B1D3A]/60 mb-10">Three tools, one login, zero friction.</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: LandmarkIcon, title: "Everyday Checking", desc: "A single account for spending and receiving, with a live running balance." },
            { icon: TrendIcon, title: "Savings, Visualized", desc: "Watch your balance trend over time instead of guessing from statements." },
            { icon: ShieldIcon, title: "Account Security", desc: "Every sign-in and transaction is logged and confirmed, end to end." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="border border-[#0B1D3A]/10 rounded-xl overflow-hidden bg-white hover:shadow-md transition">
              <div className="w-full h-36 bg-gradient-to-br from-[#132A52] to-[#0B1D3A] flex items-center justify-center">
                <Icon className="w-10 h-10 text-[#C9A24B]/70" />
              </div>
              <div className="p-6">
                <Icon className="w-6 h-6 text-[#C9A24B] mb-4" />
                <h3 className="font-serif text-lg mb-2">{title}</h3>
                <p className="text-sm text-[#0B1D3A]/65 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#0B1D3A] text-white/50 text-xs py-6">
        <div className="max-w-6xl mx-auto px-5">
          Meridian Bank is a fictional portfolio project. Not a real financial institution.
        </div>
      </footer>
    </div>
  );
}
