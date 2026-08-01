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
          <Link to="/login" className="text-sm border border-white/30 rounded px-4 py-1.5 hover:bg-white/10 transition">
            Sign In
          </Link>
        </div>
      </nav>

      <section
        className="relative overflow-hidden bg-[#0B1D3A] text-white"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 48px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 pt-20 pb-24 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[#C9A24B]/90 text-xs tracking-[0.25em] uppercase mb-5 font-medium">
              Est. Personal &amp; Business Banking
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl leading-[1.15] mb-6 text-white/95">
              Your money, moving with intention.
            </h1>
            <p className="text-white/60 max-w-md mb-9 leading-relaxed">
              Meridian keeps your balance, your history, and your next move in
              one clear view — no clutter, no guesswork.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-[#C9A24B] text-[#0B1D3A] font-medium rounded px-7 py-3 hover:bg-[#b8934a] transition text-sm tracking-wide uppercase">
              Open an account <ArrowIcon />
            </Link>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="rounded-full w-64 h-64 sm:w-80 sm:h-80 border border-[#C9A24B]/30 flex items-center justify-center">
              <div className="rounded-full w-52 h-52 sm:w-64 sm:h-64 border border-[#C9A24B]/50 flex items-center justify-center">
                <svg width="110" height="110" viewBox="0 0 24 24" fill="none" className="text-[#C9A24B]">
                  <path d="M12 2L2 8h20L12 2z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.9" />
                  <path d="M4 10v9M8 10v9M12 10v9M16 10v9M20 10v9" stroke="currentColor" strokeWidth="1.25" />
                  <path d="M2 21h20" stroke="currentColor" strokeWidth="1.25" />
                  <path d="M2 9h20" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-[#0B1D3A] rounded-lg px-5 py-3 shadow-xl">
              <p className="text-[10px] uppercase tracking-widest text-[#0B1D3A]/50">Total Balance</p>
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
            <div key={title} className="border border-[#0B1D3A]/10 rounded overflow-hidden bg-white hover:shadow-md transition">
              <div className="w-full h-36 bg-[#0B1D3A] flex items-center justify-center">
                <Icon className="w-9 h-9 text-[#C9A24B]/70" />
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
