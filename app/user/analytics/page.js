import StatsCard from "@/src/components/StatsCard"
import { PhotographIcon, ClockIcon, CheckCircleIcon, CalendarIcon } from "@heroicons/react/outline"
// import StatsCard from "../components/StatsCard"

// Mock data for demonstration
const mockStats = {
  totalUploads: 8,
  pendingRequests: 3,
  completedRequests: 5,
  thisMonth: 3,
}

const mockMonthlyData = [
  { month: "Jan", uploads: 0 },
  { month: "Feb", uploads: 2 },
  { month: "Mar", uploads: 1 },
  { month: "Apr", uploads: 3 },
  { month: "May", uploads: 2 },
  { month: "Jun", uploads: 0 },
  { month: "Jul", uploads: 0 },
  { month: "Aug", uploads: 0 },
  { month: "Sep", uploads: 0 },
  { month: "Oct", uploads: 0 },
  { month: "Nov", uploads: 0 },
  { month: "Dec", uploads: 0 },
]

const mockRequestTypes = [
  { type: "Portrait", count: 4 },
  { type: "Landscape", count: 2 },
  { type: "Product", count: 1 },
  { type: "Artistic", count: 1 },
]

const mockRecentActivity = [
  {
    id: "1",
    type: "upload",
    title: "Portrait Photo",
    date: "2023-04-15T10:30:00Z",
  },
  {
    id: "2",
    type: "response",
    title: "Product Photo",
    date: "2023-04-14T09:15:00Z",
  },
  {
    id: "3",
    type: "upload",
    title: "Landscape Photo",
    date: "2023-04-14T14:20:00Z",
  },
]

const UserAnalytics = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Uploads"
          value={mockStats.totalUploads}
          icon={<PhotographIcon className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
        <StatsCard
          title="Pending Requests"
          value={mockStats.pendingRequests}
          icon={<ClockIcon className="h-6 w-6 text-white" />}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Completed Requests"
          value={mockStats.completedRequests}
          icon={<CheckCircleIcon className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <StatsCard
          title="This Month"
          value={mockStats.thisMonth}
          icon={<CalendarIcon className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Activity Chart */}
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold mb-4">Monthly Activity</h2>
          <div className="h-64">
            <div className="flex h-full items-end">
              {mockMonthlyData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full mx-1 bg-purple-500 rounded-t-sm"
                    style={{ height: `${item.uploads * 20}%` }}
                  ></div>
                  <div className="text-xs mt-2 text-gray-600">{item.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Request Types */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Request Types</h2>
          <div className="space-y-4">
            {mockRequestTypes.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{item.type}</span>
                  <span className="text-sm text-gray-500">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: `${(item.count / mockStats.totalUploads) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card mt-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {mockRecentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div
                className={`p-2 rounded-full mr-3 ${
                  activity.type === "upload" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
                }`}
              >
                {activity.type === "upload" ? (
                  <UploadIcon className="h-5 w-5" />
                ) : (
                  <CheckCircleIcon className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-500">
                  {activity.type === "upload" ? "Uploaded a new photo" : "Received AI-generated photos"}
                  <span className="ml-2">{new Date(activity.date).toLocaleString()}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper component for the icon
const UploadIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)

export default UserAnalytics

