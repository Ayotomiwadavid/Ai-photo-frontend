"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { PhotographIcon, CheckCircleIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/outline"
import StatsCard from "../../components/StatsCard"
import ImageCard from "../../components/ImageCard"

// Mock data for demonstration
const mockRequests = [
  {
    id: "1",
    title: "Portrait Photo",
    description: "Convert to anime style portrait",
    url: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-04-15T10:30:00Z",
    status: "pending",
    userId: "user1",
    userName: "John Doe",
  },
  {
    id: "2",
    title: "Landscape Photo",
    description: "Make this look like a fantasy world",
    url: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-04-14T14:20:00Z",
    status: "pending",
    userId: "user2",
    userName: "Jane Smith",
  },
  {
    id: "3",
    title: "Product Photo",
    description: "Create a professional product image",
    url: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-04-13T09:15:00Z",
    status: "completed",
    userId: "user1",
    userName: "John Doe",
  },
  {
    id: "4",
    title: "Family Photo",
    description: "Convert to cartoon style",
    url: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-04-12T16:45:00Z",
    status: "completed",
    userId: "user3",
    userName: "Mike Johnson",
  },
]

const mockUsers = [
  { id: "user1", name: "John Doe", email: "john@example.com", requestsCount: 5 },
  { id: "user2", name: "Jane Smith", email: "jane@example.com", requestsCount: 3 },
  { id: "user3", name: "Mike Johnson", email: "mike@example.com", requestsCount: 2 },
]

const AdminDashboard = () => {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [requests, setRequests] = useState([])
  const [users, setUsers] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [responseImages, setResponseImages] = useState([])
  const [isRespondModalOpen, setIsRespondModalOpen] = useState(false)

  useEffect(() => {
    // Set the active tab based on URL parameters
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }

    // Load mock data
    setRequests(mockRequests)
    setUsers(mockUsers)
  }, [searchParams])

  const pendingRequests = requests.filter((req) => req.status === "pending")
  const completedRequests = requests.filter((req) => req.status === "completed")

  const handleViewImage = (image) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  const handleDownloadImage = (image) => {
    // In a real app, this would trigger a download
    console.log("Downloading image:", image)
    alert(`Downloading image: ${image.title}`)
  }

  const handleRespondToRequest = (image) => {
    setSelectedImage(image)
    setResponseImages([])
    setIsRespondModalOpen(true)
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const imageUrls = filesArray.map((file) => URL.createObjectURL(file))
      setResponseImages(imageUrls)
    }
  }

  const handleSubmitResponse = () => {
    // In a real app, this would upload the response images
    console.log("Submitting response for:", selectedImage)
    console.log("Response images:", responseImages)

    // Update the request status
    const updatedRequests = requests.map((req) => (req.id === selectedImage.id ? { ...req, status: "completed" } : req))
    setRequests(updatedRequests)

    // Close the modal
    setIsRespondModalOpen(false)
    alert("Response submitted successfully!")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Requests"
          value={requests.length}
          icon={<PhotographIcon className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <StatsCard
          title="Pending Requests"
          value={pendingRequests.length}
          icon={<ClockIcon className="h-6 w-6 text-white" />}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Completed Requests"
          value={completedRequests.length}
          icon={<CheckCircleIcon className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <StatsCard
          title="Total Users"
          value={users.length}
          icon={<UserGroupIcon className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "overview"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "pending"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Pending Requests
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "completed"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Completed Requests
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "users"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Users
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {requests.slice(0, 4).map((request) => (
              <ImageCard
                key={request.id}
                image={request}
                isAdmin={true}
                onView={handleViewImage}
                onDownload={handleDownloadImage}
                onRespond={handleRespondToRequest}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === "pending" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
          {pendingRequests.length === 0 ? (
            <p className="text-gray-500">No pending requests.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pendingRequests.map((request) => (
                <ImageCard
                  key={request.id}
                  image={request}
                  isAdmin={true}
                  onView={handleViewImage}
                  onDownload={handleDownloadImage}
                  onRespond={handleRespondToRequest}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "completed" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Completed Requests</h2>
          {completedRequests.length === 0 ? (
            <p className="text-gray-500">No completed requests.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {completedRequests.map((request) => (
                <ImageCard
                  key={request.id}
                  image={request}
                  isAdmin={true}
                  onView={handleViewImage}
                  onDownload={handleDownloadImage}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "users" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {users.map((user) => (
                <li key={user.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.requestsCount} requests
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Image View Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  &times;
                </button>
              </div>
            </div>
            <div className="p-4">
              <img
                src={selectedImage.url || "/placeholder.svg"}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[60vh] object-contain mb-4"
              />
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Description:</span> {selectedImage.description}
                </p>
                <p>
                  <span className="font-medium">Submitted by:</span> {selectedImage.userName}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {new Date(selectedImage.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Status:</span>
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full ${
                      selectedImage.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedImage.status}
                  </span>
                </p>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-2">
              <button onClick={() => setIsModalOpen(false)} className="btn-secondary">
                Close
              </button>
              <button onClick={() => handleDownloadImage(selectedImage)} className="btn-primary">
                Download
              </button>
              {selectedImage.status === "pending" && (
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    handleRespondToRequest(selectedImage)
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Respond
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Respond Modal */}
      {isRespondModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Respond to Request</h3>
                <button onClick={() => setIsRespondModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  &times;
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h4 className="font-medium mb-2">Original Request</h4>
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedImage.url || "/placeholder.svg"}
                    alt={selectedImage.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{selectedImage.title}</p>
                    <p className="text-sm text-gray-600">{selectedImage.description}</p>
                    <p className="text-sm text-gray-500 mt-1">By {selectedImage.userName}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Upload AI-Generated Images</h4>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10 MB each)</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleFileChange} />
                  </label>
                </div>
              </div>

              {responseImages.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Selected Response Images ({responseImages.length})</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {responseImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Response ${index}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t flex justify-end space-x-2">
              <button onClick={() => setIsRespondModalOpen(false)} className="btn-secondary">
                Cancel
              </button>
              <button
                onClick={handleSubmitResponse}
                disabled={responseImages.length === 0}
                className={`btn-primary ${responseImages.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Submit Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard

