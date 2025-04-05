"use client"
import { DownloadIcon, EyeIcon } from "@heroicons/react/outline"

const ImageCard = ({ image, isAdmin = false, onDownload, onView, onRespond }) => {
  return (
    <div className="card">
      <div className="relative pb-[100%] mb-3">
        <img
          src={image.url || "/placeholder.svg?height=200&width=200"}
          alt={image.description || "Image"}
          className="absolute inset-0 w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium truncate">{image.title || "Untitled"}</h3>

        <div className="flex items-center text-sm text-gray-500">
          <span className="truncate">{image.description || "No description"}</span>
        </div>

        <div className="flex items-center text-xs text-gray-500">
          <span>{new Date(image.createdAt || Date.now()).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span
            className={`px-2 py-0.5 rounded-full ${
              image.status === "completed"
                ? "bg-green-100 text-green-800"
                : image.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {image.status || "pending"}
          </span>
        </div>

        <div className="flex space-x-2 pt-2">
          <button
            onClick={() => onView(image)}
            className="flex items-center justify-center p-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 flex-1"
          >
            <EyeIcon className="w-4 h-4 mr-1" />
            View
          </button>

          {isAdmin ? (
            <button
              onClick={() => onDownload(image)}
              className="flex items-center justify-center p-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 flex-1"
            >
              <DownloadIcon className="w-4 h-4 mr-1" />
              Download
            </button>
          ) : null}

          {isAdmin && image.status === "pending" ? (
            <button
              onClick={() => onRespond(image)}
              className="flex items-center justify-center p-2 text-sm text-white bg-purple-600 rounded-md hover:bg-purple-700 flex-1"
            >
              Respond
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ImageCard

