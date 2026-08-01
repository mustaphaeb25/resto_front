import ReviewWidget from '../ui/ReviewWidget'

const tagStyles = {
  chef: 'bg-[#F3ECE2] text-[#8C7B68]',
  gf: 'bg-[#E6F4EA] text-[#137333]',
  vegan: 'bg-[#E8F0FE] text-[#1A73E8]',
}

export default function MenuItemCard({ item }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-border flex gap-4 items-center hover:-translate-y-0.5 shadow-sm transition-transform duration-300">
      <div className="w-[100px] h-[100px] rounded-lg overflow-hidden flex-shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-serif text-[1.1rem]">{item.name}</h4>
          <span className="font-bold text-dark-green">${item.price}</span>
        </div>
        <p className="text-[0.8rem] text-text-muted mb-2.5" style={{ lineHeight: 1.4 }}>
          {item.description}
        </p>
        <div className="flex items-center gap-4">
          {item.tags && (
            <div className="flex gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`text-[0.65rem] px-1.5 py-0.5 rounded font-semibold uppercase ${tagStyles[tag.type] || 'bg-gray-100 text-gray-600'}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
          <ReviewWidget target="DISH" itemId={item.id} itemName={item.name} size="text-[0.75rem]" />
        </div>
      </div>
    </div>
  )
}
