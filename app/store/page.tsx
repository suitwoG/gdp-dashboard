const items = [
  { name: "Streak freeze", cost: 200, description: "Protect your streak for one missed day." },
  { name: "XP boost", cost: 150, description: "Earn 2x XP for the next hour." },
  { name: "Lex notes", cost: 100, description: "Download printable lesson summaries." },
];

export default function StorePage() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Upgrades</p>
        <h1 className="text-3xl font-bold tracking-tight">Store</h1>
        <p className="text-sm text-slate-600">Spend your gems on boosts and streak savers.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm space-y-3">
              <div className="text-lg font-semibold text-slate-900">{item.name}</div>
              <p className="text-sm text-slate-600">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-emerald-600">{item.cost} gems</span>
                <button className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600 transition">
                  Redeem
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
