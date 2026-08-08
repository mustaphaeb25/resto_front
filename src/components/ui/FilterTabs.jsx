export default function FilterTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-3 mb-10 overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0 sm:justify-center sm:flex-wrap sm:overflow-visible">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`px-5 py-2.5 rounded-3xl border text-[0.85rem] font-semibold transition-all duration-300 cursor-pointer font-sans whitespace-nowrap ${
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
