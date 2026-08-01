export default function FilterTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex justify-center gap-4 mb-10 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`px-6 py-2.5 rounded-3xl border text-[0.85rem] font-semibold transition-all duration-300 cursor-pointer font-sans ${
            activeTab === tab.value
              ? 'bg-dark-green text-white border-dark-green'
              : 'bg-white text-text-dark border-border hover:bg-dark-green hover:text-white hover:border-dark-green'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
