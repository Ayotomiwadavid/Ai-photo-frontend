"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { DownloadIcon } from "@heroicons/react/outline"

// Mock data for demonstration
const mockResponses = [
  {
    id: "1",
    requestId: "3",
    requestTitle: "Product Photo",
    requestDescription: "Create a professional product image",
    originalImage: "/placeholder.svg?height=200&width=200",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
    createdAt: "2023-04-14T09:15:00Z",
  },
  {
    id: "2",
    requestId: "4",
    requestTitle: "Family Photo",
    requestDescription: "Convert to cartoon style",
    originalImage: "/placeholder.svg?height=200&width=200",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
    createdAt: "2023-04-12T16:45:00Z",
  },
]

const UserResponses = () => {
  const [searchParams] = useSearchParams()
  const [responses, setResponses] = useState([])
  const [selectedResponse, setSelectedResponse] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Load mock data
    setResponses(mockResponses)

    // Check if there's a response ID in the URL
    const responseId = searchParams.get("id")
    if (responseId) {
      const response = mockResponses.find((r) => r.id === responseId)
      if (response) {
        setSelectedResponse(response)
        setIsModalOpen(true)
      }
    }
  }, [searchParams])

  const handleViewResponse = (response) => {
    setSelectedResponse(response)
    setIsModalOpen(true)
  }

  const handleDownloadImage = (imageUrl) => {
    // In a real app, this would trigger a download
    console.log("Downloading image:", imageUrl)
    alert(`Downloading image`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Responses</h1>

      {responses.length === 0 ? (
        <div className="card">
          <p className="text-gray-500">No responses yet. Your responses will appear here once they're ready.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {responses.map((response) => (
            <div key={response.id} className="card">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="md:w-1/4">
                  <h3 className="font-medium mb-2">Original Request</h3>
                  <img
                    src={response.originalImage || "/placeholder.svg"}
                    alt="Original"
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <p className="text-sm font-medium">{response.requestTitle}</p>
                  <p className="text-sm text-gray-500">{response.requestDescription}</p>
                </div>

                <div className="md:w-3/4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">AI-Generated Images</h3>
                    <span className="text-sm text-gray-500">{new Date(response.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {response.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Response ${index}`}
                          className="h-32 w-full object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button onClick={() => handleDownloadImage(image)} className="p-2 bg-white rounded-full">
                            <DownloadIcon className="h-5 w-5 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button onClick={() => handleViewResponse(response)} className="btn-primary">
                      View Full Response
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Response View Modal */}
      {isModalOpen && selectedResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedResponse.requestTitle}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  &times;
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-medium mb-2">Original Image</h4>
                  <img
                    src={selectedResponse.originalImage || "/placeholder.svg"}
                    alt="Original"
                    className="w-full h-auto max-h-[300px] object-contain rounded-md"
                  />
                  <p className="mt-2 text-sm text-gray-600">{selectedResponse.requestDescription}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Response Details</h4>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Request ID:</span> {selectedResponse.requestId}
                    </p>
                    <p>
                      <span className="font-medium">Response Date:</span>{" "}
                      {new Date(selectedResponse.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Number of Images:</span> {selectedResponse.images.length}
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="font-medium mb-2">AI-Generated Images</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedResponse.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Response ${index}`}
                      className="w-full h-auto max-h-[200px] object-contain rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button onClick={() => handleDownloadImage(image)} className="p-2 bg-white rounded-full">
                        <DownloadIcon className="h-5 w-5 text-gray-700" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserResponses

