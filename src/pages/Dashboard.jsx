import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const EyeIcon = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
  </svg>
);
const EyeOffIcon = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a20.3 20.3 0 015.06-5.94M9.9 4.24A10.4 10.4 0 0112 4c7 0 11 7 11 7a20.3 20.3 0 01-2.66 3.75M14.12 14.12a3 3 0 11-4.24-4.24M1 1l22 22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronIcon = ({ className, open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`${className} transition-transform ${open ? "rotate-180" : ""}`}>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState({});
  const [expanded, setExpanded] = useState({});
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [type, setType] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [hideBalance, setHideBalance] = useState(false);

  async function loadAccounts() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserName(user.user_metadata?.full_name || user.email);
      const { data: accData, error: accError } = await supabase
        .from("accounts")
        .select("*")
        .eq("user_id", user.id)
        .order("account_type");

      if (!accError && accData) {
        setAccounts(accData);
        if (accData.length && !selectedAccount) setSelectedAccount(accData[0].id);

        const { data: txData } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (txData) {
          const grouped = {};
          accData.forEach((acc) => {
            grouped[acc.id] = txData.filter((t) => t.account_id === acc.id);
          });
          setTransactions(grouped);
        }
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid amount.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.rpc("create_transaction", {
      p_account_id: selectedAccount,
      p_type: type,
      p_amount: Number(amount),
      p_description: description || null,
    });
    setSubmitting(false);
    if (error) {
      setError(error.message);
    } else {
      setAmount("");
      setDescription("");
      await loadAccounts();
    }
  };

  const toggleExpanded = (accId) => {
    setExpanded((prev) => ({ ...prev, [accId]: !prev[accId] }));
  };

  const total = accounts.reduce((sum, a) => sum + Number(a.balance), 0);

  const formatMoney = (val) =>
    hideBalance
      ? "••••••"
      : `$${Number(val).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#0B1D3A]">
        Loading...
      </div>
    );
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
          <div className="flex items-center justify-between mb-1">
            <p className="text-white/60 text-sm">Total Balance</p>
            <button
              onClick={() => setHideBalance(!hideBalance)}
              className="text-white/50 hover:text-white transition"
              aria-label="Toggle balance visibility"
            >
              {hideBalance ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>
          <p className="font-serif text-4xl">{formatMoney(total)}</p>
        </div>

        <div className="space-y-4 mb-8">
          {accounts.map((acc) => {
            const accTx = transactions[acc.id] || [];
            const isOpen = expanded[acc.id];
            return (
              <div key={acc.id} className="bg-white border border-[#0B1D3A]/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleExpanded(acc.id)}
                  className="w-full text-left p-5 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#0B1D3A]/50 mb-1">
                      {acc.account_type}
                    </p>
                    <p className="font-serif text-2xl">{formatMoney(acc.balance)}</p>
                  </div>
                  <ChevronIcon className="text-[#0B1D3A]/40" open={isOpen} />
                </button>

                {isOpen && (
                  <div className="border-t border-[#0B1D3A]/10 px-5 py-3">
                    {accTx.length === 0 ? (
                      <p className="text-sm text-[#0B1D3A]/40 py-3">No transactions yet.</p>
                    ) : (
                      <div className="divide-y divide-[#0B1D3A]/5">
                        {accTx.map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between py-3">
                            <div>
                              <p className="text-sm font-medium">
                                {tx.description || (tx.type === "deposit" ? "Deposit" : "Withdrawal")}
                              </p>
                              <p className="text-xs text-[#0B1D3A]/50">{formatDate(tx.created_at)}</p>
                            </div>
                            <p
                              className={`text-sm font-medium ${
                                tx.type === "deposit" ? "text-emerald-700" : "text-[#0B1D3A]/70"
                              }`}
                            >
                              {tx.type === "deposit" ? "+" : "−"}
                              {hideBalance
                                ? "•••"
                                : `$${Number(tx.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-[#0B1D3A]/10 rounded-xl p-6">
          <h2 className="font-serif text-lg mb-4">New Transaction</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#0B1D3A]/60 mb-1">Account</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full border border-[#0B1D3A]/20 rounded-lg px-3 py-2"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.account_type.charAt(0).toUpperCase() + acc.account_type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#0B1D3A]/60 mb-1">Type</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setType("deposit")}
                  className={`flex-1 py-2 rounded-lg border ${
                    type === "deposit"
                      ? "bg-[#0B1D3A] text-white border-[#0B1D3A]"
                      : "border-[#0B1D3A]/20 text-[#0B1D3A]"
                  }`}
                >
                  Deposit
                </button>
                <button
                  type="button"
                  onClick={() => setType("withdrawal")}
                  className={`flex-1 py-2 rounded-lg border ${
                    type === "withdrawal"
                      ? "bg-[#0B1D3A] text-white border-[#0B1D3A]"
                      : "border-[#0B1D3A]/20 text-[#0B1D3A]"
                  }`}
                >
                  Withdrawal
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#0B1D3A]/60 mb-1">Amount</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full border border-[#0B1D3A]/20 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-[#0B1D3A]/60 mb-1">
                Description (optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Paycheck, groceries"
                className="w-full border border-[#0B1D3A]/20 rounded-lg px-3 py-2"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#C9A24B] text-[#0B1D3A] font-medium py-2.5 rounded-lg hover:bg-[#dab55f] transition disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Submit Transaction"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
