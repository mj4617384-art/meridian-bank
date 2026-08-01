import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || user.email);
        const { data, error } = await supabase
          .from("accounts")
          .select("*")
          .eq("user_id", user.id)
          .order("account_type");
        if (!error) setAccounts(data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const total = accounts.reduce((sum, a) => sum + Number(a.balance), 0);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#0B1D3A]">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#0B1D3A] font-sans">
      <nav className="bg-[#0B1D3A] text-white">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="font-serif text-xl">Meridian Bank</span>
          <button onClick={handleSignOut} className="text-sm text-white/80 hover:text-white">
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-5 py-10">
        <h1 className="text-2xl font-bold mb-1">Welcome, {userName}</h1>
        <p className="text-[#0B1D3A]/60 mb-8">Here's your account overview.</p>

        <div className="bg-[#0B1D3A] text-white rounded-2xl p-6 mb-6">
          <p className="text-white/60 text-sm mb-1">Total Balance</p>
          <p className="font-serif text-4xl">
            ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {accounts.map((acc) => (
            <div key={acc.id} className="bg-white border border-[#0B1D3A]/10 rounded-xl p-5">
              <p className="text-xs uppercase tracking-wide text-[#0B1D3A]/50 mb-1">
                {acc.account_type}
              </p>
              <p className="font-serif text-2xl">
                ${Number(acc.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
