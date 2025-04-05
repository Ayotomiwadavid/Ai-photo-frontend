const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="card flex items-center">
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  )
}

export default StatsCard

