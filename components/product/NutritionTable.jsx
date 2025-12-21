export default function NutritionTable({ nutrition }) {
  if (!nutrition) return null;

  const rows = [
    { label: "Energy", value: `${nutrition.calories || 0} Kcal` },
    { label: "Protein", value: nutrition.protein },
    { label: "Carbohydrates", value: nutrition.carbs },
    { label: "Total Fat", value: nutrition.fat },
    { label: "Dietary Fiber", value: nutrition.fiber },
  ];

  return (
    <div className="bg-cream-50/50 rounded-xl p-4 border border-green-900/5">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
        <span className="text-sm font-medium text-charcoal-500">Serving Size</span>
        <span className="font-bold text-green-950">{nutrition.servingSize}</span>
      </div>
      
      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="text-charcoal-700 font-medium">{row.label}</span>
            <span className="font-bold text-green-900">{row.value}</span>
          </div>
        ))}
      </div>
      
      <p className="text-[10px] text-charcoal-400 mt-4 text-center">
        *Approximate values. Percent daily values are based on a 2,000 calorie diet.
      </p>
    </div>
  );
}