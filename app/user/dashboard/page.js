"use client"
import { Link } from "react-router-dom"
import { PhotographIcon, CheckCircleIcon, ClockIcon, UploadIcon } from "@heroicons/react/outline"
import StatsCard from "@/src/components/StatsCard"
import { useAuth } from "@/src/context/AuthContext"

// Mock data for demonstration
const mockStats = {
  totalUploads: 8,
  pendingRequests: 3,
  completedRequests: 5,
}

const mockRecentUploads = [
  {
    id: "1",
    title: "Portrait Photo",
    description: "Convert to anime style portrait",
    url: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-04-15T10:30:00Z",
    status: "pending",
  },
  {
    id: "2",
    title: "Landscape Photo",
    description: "Make this look like a fantasy world",
    url: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-04-14T14:20:00Z",
    status: "pending",
  },
  {
    id: "3",
    title: "Product Photo",
    description: "Create a professional product image",
    url: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-04-13T09:15:00Z",
    status: "completed",
  },
]

const mockRecentResponses = [
  {
    id: "1",
    requestId: "3",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
    createdAt: "2023-04-14T09:15:00Z",
  },
]

const UserDashboard = () => {
  const { currentUser } = useAuth()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link to="/user/upload" className="btn-primary flex items-center">
          <UploadIcon className="w-4 h-4 mr-2" />
          New Upload
        </Link>
      </div>

      {/* Welcome Message */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-2">Welcome back, {currentUser?.name || "User"}!</h2>
        <p className="text-gray-600">
          Here's an overview of your AI photo generation activity. Upload your photos and get AI-generated versions
          based on your preferences.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
      </div>

      {/* Recent Uploads */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Uploads</h2>
          <Link to="/user/upload" className="text-sm text-purple-600 hover:text-purple-800">
            View All
          </Link>
        </div>

        {mockRecentUploads.length === 0 ? (
          <p className="text-gray-500">No uploads yet. Start by uploading your first photo!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockRecentUploads.map((upload) => (
                  <tr key={upload.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={upload.url || "/placeholder.svg"}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{upload.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{upload.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{new Date(upload.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${upload.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {upload.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Responses */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Responses</h2>
          <Link to="/user/responses" className="text-sm text-purple-600 hover:text-purple-800">
            View All
          </Link>
        </div>

        {mockRecentResponses.length === 0 ? (
          <p className="text-gray-500">No responses yet. Your responses will appear here once they're ready.</p>
        ) : (
          <div className="space-y-4">
            {mockRecentResponses.map((response) => (
              <div key={response.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Response for Request #{response.requestId}</h3>
                  <span className="text-sm text-gray-500">{new Date(response.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {response.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Response ${index}`}
                      className="h-24 w-full object-cover rounded-md"
                    />
                  ))}
                </div>
                <div className="mt-2 text-right">
                  <Link
                    to={`/user/responses?id=${response.id}`}
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard

