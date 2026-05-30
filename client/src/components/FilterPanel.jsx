
// components/FilterPanel.jsx

const FilterPanel = ({
  category,  setCategory,
  minPrice,  setMinPrice,
  maxPrice,  setMaxPrice,
  sortBy,    setSortBy,
  order,     setOrder,
  categories,
  resetFilters,
  activeFilters,
  setPage
}) => {

  const handleChange = (setter) => (e) => {
    setter(e.target.value)
    setPage(1)   // always reset to page 1 when filter changes
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Filters</h3>
        {activeFilters > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-orange-500 hover:underline"
          >
            Clear all ({activeFilters})
          </button>
        )}
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={handleChange(setCategory)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={minPrice}
            onChange={handleChange(setMinPrice)}
            placeholder="Min"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <span className="text-gray-400 text-sm">–</span>
          <input
            type="number"
            value={maxPrice}
            onChange={handleChange(setMaxPrice)}
            placeholder="Max"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={handleChange(setSortBy)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="createdAt">Newest First</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Order */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Order
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => { setOrder('desc'); setPage(1) }}
            className={`flex-1 py-2 text-sm rounded-lg border transition
              ${order === 'desc'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'border-gray-300 hover:bg-gray-50'
              }`}
          >
            ↓ Desc
          </button>
          <button
            onClick={() => { setOrder('asc'); setPage(1) }}
            className={`flex-1 py-2 text-sm rounded-lg border transition
              ${order === 'asc'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'border-gray-300 hover:bg-gray-50'
              }`}
          >
            ↑ Asc
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel